import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {MatomoService} from '../../services/matomo.service';
import {ActivityLocationData, ActivityLog, ActivityLogNav} from '../../_models/activityLog';
import {hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {icon, latLng, Map, marker, Marker, point, polyline, Polyline, tileLayer, TileLayer} from 'leaflet';
import {environment} from '../../../environments/environment';

declare let l;

@Component({
  templateUrl: './activity_log_details.component.html',
  styleUrls: ['activity_log_details.component.scss']
})
export class ActivityLogDetailsComponent implements OnInit, OnDestroy {

  loading: number;
  loadingExpected: number;

  currentUser: User;

  activityId: number;
  loggedActivity: ActivityLog;
  loggedActivityName: string;
  activityLogsNav: ActivityLogNav;

  gridImpactRow: string = 'col-4';
  gridStatRow: string = 'col-4';

  pageTitle: string = 'Core | Activities';

  public displayMap: boolean = false;
  public routeMap: Map;
  public streetMaps: TileLayer;
  public markerStart: Marker;
  public markerFinish: Marker;
  public mapOptions: any;
  public route: Polyline;

  // distanceChart
  public distanceChartData1: Array<number>;
  public distanceChartData: Array<any>;
  public distanceChartLabels: Array<any>;
  public distanceChartOptions: any;
  public distanceChartColours: Array<any>;
  public distanceChartLegend: boolean;
  public distanceChartType: string;

  // speedChart
  public speedChartData1: Array<number>;
  public speedChartData: Array<any>;
  public speedChartLabels: Array<any>;
  public speedChartOptions: any;
  public speedChartColours: Array<any>;
  public speedChartLegend: boolean;
  public speedChartType: string;

  // heartChart
  public heartChartData1: Array<number>;
  public heartChartData: Array<any>;
  public heartChartLabels: Array<any>;
  public heartChartOptions: any;
  public heartChartColours: Array<any>;
  public heartChartLegend: boolean;
  public heartChartType: string;

  // altitudeChart
  public altitudeChartData1: Array<number>;
  public altitudeChartData: Array<any>;
  public altitudeChartLabels: Array<any>;
  public altitudeChartOptions: any;
  public altitudeChartColours: Array<any>;
  public altitudeChartLegend: boolean;
  public altitudeChartType: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _ActivatedRoute: ActivatedRoute,
              private _matomoService: MatomoService
  ) {
    this.loading = 0;
    this.loadingExpected = 1;
    this.loggedActivityName = 'Details';
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    } else {
      this._matomoService.setupTracking(this.pageTitle);
      this._matomoService.setCustomVariable('apiCalls', this.loadingExpected.toString(), 'page');
      this._ActivatedRoute.paramMap.subscribe(params => {
        // tslint:disable-next-line:radix
        this.activityId = parseInt(params.get('id'));
      });
      this.loadFromApi();
    }
  }

  ngOnDestroy(): void {
    /*this.routeMap.remove();
    this.routeMap = null;*/
  }

  pullToRefresh(): void {
    this._matomoService.trackEvent('core', 'api', 'cache', 0);
    this.buildViewContent(this.activityId, true);
  }

  loadFromApi(): void {
    this._matomoService.trackEvent('core', 'api', 'cache', 1);
    this.buildViewContent(this.activityId, false);
  }

  buildViewContent(activityId: any, bustCache?: boolean) {
    this.loading = 0;
    this.displayMap = false;

    this.resetCharts();

    this.apiService.getActivitiesLogDetails(activityId, bustCache).subscribe((data) => {
      this.loggedActivity = data['results'];
      this.activityLogsNav = data['nav'];
      this.loggedActivityName = this.loggedActivity.dateFormatted + ' - ' + this.loggedActivity.exerciseTag;

      let impactRowItems = 0;
      if (this.loggedActivity.steps > 0) {
        impactRowItems++;
      }
      if (this.loggedActivity.calorie > 0) {
        impactRowItems++;
      }
      if (this.loggedActivity.duration > 0) {
        impactRowItems++;
      }
      this.gridImpactRow = this.calcGridSize(impactRowItems);

      let statRowItems = 0;
      if (this.loggedActivity.heartRateMean > 0) {
        statRowItems++;
      }
      if (this.loggedActivity.speedMean > 0) {
        statRowItems++;
      }
      if (this.loggedActivity.altitudeMin > 0) {
        statRowItems++;
      }
      this.gridStatRow = this.calcGridSize(statRowItems);

      if (typeof data['results']['liveData']['distance'] !== 'undefined' && data['results']['liveData']['distance'].length > 0) {
        for (let i = 0; i < data['results']['liveData']['distance'].length; i++) {
          this.distanceChartLabels.push(data['results']['liveData']['distance'][i]['timestamp']);
          this.distanceChartData1.push(data['results']['liveData']['distance'][i]['value']);
        }
        this.distanceChartOptions.scales.yAxes[0].ticks.max = data['results']['maxDistance'];
        this.distanceChartOptions.scales.yAxes[0].ticks.min = 0;
      }

      if (typeof data['results']['liveData']['speed'] !== 'undefined' && data['results']['liveData']['speed'].length > 0) {
        for (let i = 0; i < data['results']['liveData']['speed'].length; i++) {
          this.speedChartLabels.push(data['results']['liveData']['speed'][i]['timestamp']);
          this.speedChartData1.push(data['results']['liveData']['speed'][i]['value']);
        }
        this.speedChartOptions.scales.yAxes[0].ticks.max = data['results']['maxSpeed'];
        this.speedChartOptions.scales.yAxes[0].ticks.min = 0;
      }

      if (typeof data['results']['liveData']['heart_rate'] !== 'undefined' && data['results']['liveData']['heart_rate'].length > 0) {
        for (let i = 0; i < data['results']['liveData']['heart_rate'].length; i++) {
          this.heartChartLabels.push(data['results']['liveData']['heart_rate'][i]['timestamp']);
          this.heartChartData1.push(data['results']['liveData']['heart_rate'][i]['value']);
        }
        this.heartChartOptions.scales.yAxes[0].ticks.max = data['results']['maxHeart'];
        this.heartChartOptions.scales.yAxes[0].ticks.min = 0;
      }

      if (typeof data['results']['liveData']['altitude'] !== 'undefined' && data['results']['liveData']['altitude'].length > 0) {
        for (let i = 0; i < data['results']['liveData']['altitude'].length; i++) {
          this.altitudeChartLabels.push(data['results']['liveData']['altitude'][i]['timestamp']);
          this.altitudeChartData1.push(data['results']['liveData']['altitude'][i]['value']);
        }
        this.altitudeChartOptions.scales.yAxes[0].ticks.max = data['results']['maxAltitude'];
        this.altitudeChartOptions.scales.yAxes[0].ticks.min = 0;
      }

      if (typeof data['results']['locationData'] !== 'undefined' && data['results']['locationData'].length > 0) {
        this.buildMapView(data['results']['locationData']);
      } else {
        this.routeMap = null;
      }

      this.emitApiLoaded();

      if (typeof this.activityLogsNav.nextMonth !== 'undefined' && this.activityLogsNav.nextMonth !== '') {
        // tslint:disable-next-line:no-shadowed-variable
        this.apiService.getActivitiesLogDetails(this.activityLogsNav.nextMonth, false).subscribe((data) => {
          if (!environment.production) {
            console.log('Pre-cached ' + this.activityLogsNav.nextMonth);
          }
        });
      }
      if (typeof this.activityLogsNav.prevMonth !== 'undefined' && this.activityLogsNav.prevMonth !== '') {
        // tslint:disable-next-line:no-shadowed-variable
        this.apiService.getActivitiesLogDetails(this.activityLogsNav.prevMonth, false).subscribe((data) => {
          if (!environment.production) {
            console.log('Pre-cached ' + this.activityLogsNav.prevMonth);
          }
        });
      }
    });
  }

  calcGridSize(rowItems: number) {
    switch (rowItems) {
      case 1:
        return 'col-12';
      case 2:
        return 'col-12 col-md-6';
      case 3:
        return 'col-12 col-md-4';
      case 4:
        return 'col-12 col-md-3';
    }
  }

  onMapReady(map: Map) {
    this.routeMap = map;
    this.routeMap.fitBounds(this.route.getBounds(), {
      padding: point(24, 24),
      maxZoom: 18,
      animate: true
    });
  }

  buildMapView(locationData: Array<ActivityLocationData>) {
    if (this.routeMap) {
      // this.routeMap.removeLayer(this.streetMaps);
      this.routeMap.removeLayer(this.route);
      this.routeMap.removeLayer(this.markerStart);
      this.routeMap.removeLayer(this.markerFinish);
    }

    // Define our base layers so we can reference them multiple times
    this.streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Marker for the top of Mt. Ranier
    this.markerStart = marker([locationData[0].latitude, locationData[0].longitude], {
      icon: icon({
        iconSize: [33, 45],
        iconAnchor: [13, 41],
        iconUrl: 'assets/map/pin-icon-start.png',
        shadowUrl: 'assets/map/pin-shadow.png'
      })
    });

    // Marker for the parking lot at the base of Mt. Ranier trails
    this.markerFinish = marker([locationData[locationData.length - 1].latitude, locationData[locationData.length - 1].longitude], {
      icon: icon({
        iconSize: [33, 45],
        iconAnchor: [13, 41],
        iconUrl: 'assets/map/pin-icon-end.png',
        shadowUrl: 'assets/map/pin-shadow.png'
      })
    });

    const mapPoints = [];
    for (let i = 0; i < locationData.length; i++) {
      const mapPoint = [
        locationData[i].latitude,
        locationData[i].longitude
      ];
      mapPoints.push(mapPoint);
    }

    // Path from paradise to summit - most points omitted from this example for brevity
    this.route = polyline(mapPoints);

    if (this.routeMap) {
      this.routeMap.addLayer(this.streetMaps);
      this.routeMap.addLayer(this.route);
      this.routeMap.addLayer(this.markerStart);
      this.routeMap.addLayer(this.markerFinish);
      this.routeMap.whenReady(() => {
        this.routeMap.fitBounds(this.route.getBounds(), {
          padding: point(24, 24),
          maxZoom: 18,
          animate: true
        });
      });
    } else {
      // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
      this.mapOptions = {
        layers: [this.streetMaps, this.route, this.markerStart, this.markerFinish],
        zoom: 20,
        center: latLng([locationData[0].latitude, locationData[0].longitude])
      };
    }

    this.displayMap = true;
  }

  activityClicked(id: number | string) {
    this.router.navigate(['/activities/activity', id]);
    this.buildViewContent(id);
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking(-1, this.pageTitle + ' | ' + this.loggedActivityName);
    }
  }

  private resetCharts() {
    // distanceChart
    this.distanceChartData1 = [];
    this.distanceChartData = [
      {
        data: this.distanceChartData1,
        label: 'Current'
      }
    ];
    /* tslint:disable:max-line-length */
    this.distanceChartLabels = [];

    /* tslint:enable:max-line-length */
    this.distanceChartOptions = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return {backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor};
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: false,
            maxTicksLimit: 5,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(120 / 5),
            max: 120
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      },
      legend: {
        display: false
      }
    };
    this.distanceChartColours = [
      { // brandSuccess
        backgroundColor: hexToRgba('#20a8d8', 10),
        borderColor: '#20a8d8',
        pointHoverBackgroundColor: '#fff'
      },
    ];
    this.distanceChartLegend = false;
    this.distanceChartType = 'line';

    // speedChart
    this.speedChartData1 = [];
    this.speedChartData = [
      {
        data: this.speedChartData1,
        label: 'Current'
      }
    ];
    /* tslint:disable:max-line-length */
    this.speedChartLabels = [];

    /* tslint:enable:max-line-length */
    this.speedChartOptions = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return {backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor};
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: false,
            maxTicksLimit: 5,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(120 / 5),
            max: 120
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      },
      legend: {
        display: false
      }
    };
    this.speedChartColours = [
      { // brandInfo
        backgroundColor: hexToRgba('#4dbd74', 10),
        borderColor: '#4dbd74',
        pointHoverBackgroundColor: '#fff'
      }
    ];
    this.speedChartLegend = false;
    this.speedChartType = 'line';

    // heartChart
    this.heartChartData1 = [];
    this.heartChartData = [
      {
        data: this.heartChartData1,
        label: 'Current'
      }
    ];
    /* tslint:disable:max-line-length */
    this.heartChartLabels = [];

    /* tslint:enable:max-line-length */
    this.heartChartOptions = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return {backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor};
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: false,
            maxTicksLimit: 5,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(120 / 5),
            max: 120
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      },
      legend: {
        display: false
      }
    };
    this.heartChartColours = [
      { // brandInfo
        backgroundColor: hexToRgba('#f86c6b', 10),
        borderColor: '#f86c6b',
        pointHoverBackgroundColor: '#fff'
      }
    ];
    this.heartChartLegend = false;
    this.heartChartType = 'line';

    // altitudeChart
    this.altitudeChartData1 = [];
    this.altitudeChartData = [
      {
        data: this.altitudeChartData1,
        label: 'Current'
      }
    ];
    /* tslint:disable:max-line-length */
    this.altitudeChartLabels = [];

    /* tslint:enable:max-line-length */
    this.altitudeChartOptions = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return {backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor};
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: false,
            maxTicksLimit: 5,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(120 / 5),
            max: 120
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      },
      legend: {
        display: false
      }
    };
    this.altitudeChartColours = [
      { // brandInfo
        backgroundColor: hexToRgba('#f86c6b', 10),
        borderColor: '#f86c6b',
        pointHoverBackgroundColor: '#fff'
      }
    ];
    this.altitudeChartLegend = false;
    this.altitudeChartType = 'line';
  }

}
