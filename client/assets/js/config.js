/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

   $urlRouterProvider.otherwise("/login");


    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

         .state('login', {
             abstract: true,
             templateUrl: "login.html",
         })

        //.state('dashboards', {
        //    abstract: true,
        //    url: "/dashboards",
        //    templateUrl: "views/common/content.html",
        //});

        //.state('dashboards.dashboard_1', {
        //    url: "/dashboard_1",
        //    templateUrl: "views/dashboard_1.html",
        //    resolve: {
                
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {

        //                    serie: true,
        //                    name: 'angular-flot',
        //                    files: ['Assets/js/plugins/flot/jquery.flot.js', 'Assets/js/plugins/flot/jquery.flot.time.js', 'Assets/js/plugins/flot/jquery.flot.tooltip.min.js', 'Assets/js/plugins/flot/jquery.flot.spline.js', 'Assets/js/plugins/flot/jquery.flot.resize.js', 'Assets/js/plugins/flot/jquery.flot.pie.js', 'Assets/js/plugins/flot/curvedLines.js', 'Assets/js/plugins/flot/angular-flot.js', ]
        //                },
        //                {
        //                    name: 'angles',
        //                    files: ['Assets/js/plugins/chartJs/angles.js', 'Assets/js/plugins/chartJs/Chart.min.js']
        //                },
        //                {
        //                    name: 'angular-peity',
        //                    files: ['Assets/js/plugins/peity/jquery.peity.min.js', 'Assets/js/plugins/peity/angular-peity.js']
        //                }
        //            ]);
        //        }
                
        //    }
        //})
        //.state('dashboards.dashboard_2', {
        //    url: "/dashboard_2",
        //    templateUrl: "views/dashboard_2.html",
        //    data: { pageTitle: 'Dashboard 2' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    serie: true,
        //                    name: 'angular-flot',
        //                    files: ['Assets/js/plugins/flot/jquery.flot.js', 'Assets/js/plugins/flot/jquery.flot.time.js', 'Assets/js/plugins/flot/jquery.flot.tooltip.min.js', 'Assets/js/plugins/flot/jquery.flot.spline.js', 'Assets/js/plugins/flot/jquery.flot.resize.js', 'vjs/plugins/flot/jquery.flot.pie.js', 'Assets/js/plugins/flot/curvedLines.js', 'Assets/js/plugins/flot/angular-flot.js', ]
        //                },
        //                {
        //                    files: ['Assets/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js']
        //                },
        //                {
        //                    files: ['Assets/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
        //                },
        //                {
        //                    name: 'ui.checkbox',
        //                    files: ['Assets/js/bootstrap/angular-bootstrap-checkbox.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('dashboards.dashboard_3', {
        //    url: "/dashboard_3",
        //    templateUrl: "views/dashboard_3.html",
        //    data: { pageTitle: 'Dashboard 3' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'angles',
        //                    files: ['Assets/js/plugins/chartJs/angles.js', 'Assets/js/plugins/chartJs/Chart.min.js']
        //                },
        //                {
        //                    name: 'angular-peity',
        //                    files: ['Assets/js/plugins/peity/jquery.peity.min.js', 'Assets/js/plugins/peity/angular-peity.js']
        //                },
        //                {
        //                    name: 'ui.checkbox',
        //                    files: ['Assets/js/bootstrap/angular-bootstrap-checkbox.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('dashboards_top', {
        //    abstract: true,
        //    url: "/dashboards_top",
        //    templateUrl: "views/common/content_top_navigation.html",
        //})
        //.state('dashboards_top.dashboard_4', {
        //    url: "/dashboard_4",
        //    templateUrl: "views/dashboard_4.html",
        //    data: { pageTitle: 'Dashboard 4' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'angles',
        //                    files: ['Assets/js/plugins/chartJs/angles.js', 'Assets/js/plugins/chartJs/Chart.min.js']
        //                },
        //                {
        //                    name: 'angular-peity',
        //                    files: ['Assets/js/plugins/peity/jquery.peity.min.js', 'Assets/js/plugins/peity/angular-peity.js']
        //                },
        //                {
        //                    serie: true,
        //                    name: 'angular-flot',
        //                    files: ['Assets/js/plugins/flot/jquery.flot.js', 'Assets/js/plugins/flot/jquery.flot.time.js', 'Assets/js/plugins/flot/jquery.flot.tooltip.min.js', 'Assets/js/plugins/flot/jquery.flot.spline.js', 'Assets/js/plugins/flot/jquery.flot.resize.js', 'Assets/js/plugins/flot/jquery.flot.pie.js', 'Assets/js/plugins/flot/curvedLines.js', 'Assets/js/plugins/flot/angular-flot.js', ]
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('dashboards.dashboard_4_1', {
        //    url: "/dashboard_4_1",
        //    templateUrl: "views/dashboard_4_1.html",
        //    data: { pageTitle: 'Dashboard 4' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'angles',
        //                    files: ['Assets/js/plugins/chartJs/angles.js', 'Assets/js/plugins/chartJs/Chart.min.js']
        //                },
        //                {
        //                    name: 'angular-peity',
        //                    files: ['Assets/js/plugins/peity/jquery.peity.min.js', 'Assets/js/plugins/peity/angular-peity.js']
        //                },
        //                {
        //                    serie: true,
        //                    name: 'angular-flot',
        //                    files: ['Assets/js/plugins/flot/jquery.flot.js', 'Assets/js/plugins/flot/jquery.flot.time.js', 'Assets/js/plugins/flot/jquery.flot.tooltip.min.js', 'Assets/js/plugins/flot/jquery.flot.spline.js', 'Assets/js/plugins/flot/jquery.flot.resize.js', 'Assets/js/plugins/flot/jquery.flot.pie.js', 'Assets/js/plugins/flot/curvedLines.js', 'Assets/js/plugins/flot/angular-flot.js', ]
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('layouts', {
        //    url: "/layouts",
        //    templateUrl: "views/layouts.html",
        //    data: { pageTitle: 'Layouts' },
        //})
        //.state('charts', {
        //    abstract: true,
        //    url: "/charts",
        //    templateUrl: "views/common/content.html",
        //})
        //.state('charts.flot_chart', {
        //    url: "/flot_chart",
        //    templateUrl: "views/graph_flot.html",
        //    data: { pageTitle: 'Flot chart' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    serie: true,
        //                    name: 'angular-flot',
        //                    files: ['Assets/js/plugins/flot/jquery.flot.js', 'Assets/js/plugins/flot/jquery.flot.time.js', 'Assets/js/plugins/flot/jquery.flot.tooltip.min.js', 'Assets/js/plugins/flot/jquery.flot.spline.js', 'Assets/js/plugins/flot/jquery.flot.resize.js', 'Assets/js/plugins/flot/jquery.flot.pie.js', 'Assets/js/plugins/flot/curvedLines.js', 'Assets/js/plugins/flot/angular-flot.js', ]
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('charts.rickshaw_chart', {
        //    url: "/rickshaw_chart",
        //    templateUrl: "views/graph_rickshaw.html",
        //    data: { pageTitle: 'Rickshaw chart' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    reconfig: true,
        //                    serie: true,
        //                    files: ['Assets/js/plugins/rickshaw/vendor/d3.v3.js', 'Assets/js/plugins/rickshaw/rickshaw.min.js']
        //                },
        //                {
        //                    reconfig: true,
        //                    name: 'angular-rickshaw',
        //                    files: ['Assets/js/plugins/rickshaw/angular-rickshaw.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('charts.peity_chart', {
        //    url: "/peity_chart",
        //    templateUrl: "views/graph_peity.html",
        //    data: { pageTitle: 'Peity graphs' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'angular-peity',
        //                    files: ['Assets/js/plugins/peity/jquery.peity.min.js', 'Assets/js/plugins/peity/angular-peity.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('charts.sparkline_chart', {
        //    url: "/sparkline_chart",
        //    templateUrl: "views/graph_sparkline.html",
        //    data: { pageTitle: 'Sparkline chart' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/js/plugins/sparkline/jquery.sparkline.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('charts.chartjs_chart', {
        //    url: "/chartjs_chart",
        //    templateUrl: "views/chartjs.html",
        //    data: { pageTitle: 'Chart.js' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/js/plugins/chartJs/Chart.min.js']
        //                },
        //                {
        //                    name: 'angles',
        //                    files: ['Assets/js/plugins/chartJs/angles.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('mailbox', {
        //    abstract: true,
        //    url: "/mailbox",
        //    templateUrl: "views/common/content.html",
        //})
        //.state('mailbox.inbox', {
        //    url: "/inbox",
        //    templateUrl: "views/mailbox.html",
        //    data: { pageTitle: 'Mail Inbox' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/css/plugins/iCheck/custom.css', 'Assets/js/plugins/iCheck/icheck.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('mailbox.email_view', {
        //    url: "/email_view",
        //    templateUrl: "views/mail_detail.html",
        //    data: { pageTitle: 'Mail detail' }
        //})
        //.state('mailbox.email_compose', {
        //    url: "/email_compose",
        //    templateUrl: "views/mail_compose.html",
        //    data: { pageTitle: 'Mail compose' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/css/plugins/summernote/summernote.css', 'Assets/css/plugins/summernote/summernote-bs3.css', 'Assets/js/plugins/summernote/summernote.min.js']
        //                },
        //                {
        //                    name: 'summernote',
        //                    files: ['Assets/css/plugins/summernote/summernote.css', 'Assets/css/plugins/summernote/summernote-bs3.css', 'Assets/js/plugins/summernote/summernote.min.js', 'Assets/js/plugins/summernote/angular-summernote.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('mailbox.email_template', {
        //    url: "/email_template",
        //    templateUrl: "views/email_template.html",
        //    data: { pageTitle: 'Mail compose' }
        //})
        //.state('widgets', {
        //    url: "/widgets",
        //    templateUrl: "views/widgets.html",
        //    data: { pageTitle: 'Widhets' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    serie: true,
        //                    name: 'angular-flot',
        //                    files: ['Assets/js/plugins/flot/jquery.flot.js', 'Assets/js/plugins/flot/jquery.flot.time.js', 'Assets/js/plugins/flot/jquery.flot.tooltip.min.js', 'Assets/js/plugins/flot/jquery.flot.spline.js', 'Assets/js/plugins/flot/jquery.flot.resize.js', 'Assets/js/plugins/flot/jquery.flot.pie.js', 'Assets/js/plugins/flot/curvedLines.js', 'Assets/js/plugins/flot/angular-flot.js', ]
        //                },
        //                {
        //                    files: ['Assets/css/plugins/iCheck/custom.css', 'Assets/js/plugins/iCheck/icheck.min.js']
        //                },
        //                {
        //                    files: ['Assets/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js', 'Assets/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
        //                },
        //                {
        //                    name: 'ui.checkbox',
        //                    files: ['Assets/js/bootstrap/angular-bootstrap-checkbox.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('forms', {
        //    abstract: true,
        //    url: "/forms",
        //    templateUrl: "views/common/content.html",
        //})
        //.state('forms.basic_form', {
        //    url: "/basic_form",
        //    templateUrl: "views/form_basic.html",
        //    data: { pageTitle: 'Basic form' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/css/plugins/iCheck/custom.css', 'Assets/js/plugins/iCheck/icheck.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('forms.advanced_plugins', {
        //    url: "/advanced_plugins",
        //    templateUrl: "views/form_advanced.html",
        //    data: { pageTitle: 'Advanced form' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'ui.knob',
        //                    files: ['Assets/js/plugins/jsKnob/jquery.knob.js', 'Assets/js/plugins/jsKnob/angular-knob.js']
        //                },
        //                {
        //                    files: ['Assets/css/plugins/ionRangeSlider/ion.rangeSlider.css',
        //                        'Assets/css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css',
        //                        'Assets/js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
        //                },
        //                {
        //                    insertBefore: '#loadBefore',
        //                    name: 'localytics.directives',
        //                    files: ['Assets/css/plugins/chosen/chosen.css',
        //                        'Assets/js/plugins/chosen/chosen.jquery.js',
        //                        'Assets/js/plugins/chosen/chosen.js']
        //                },
        //                {
        //                    name: 'nouislider',
        //                    files: ['Assets/css/plugins/nouslider/jquery.nouislider.css',
        //                        'Assets/js/plugins/nouslider/jquery.nouislider.min.js',
        //                        'Assets/js/plugins/nouslider/angular-nouislider.js']
        //                },
        //                {
        //                    name: 'datePicker',
        //                    files: ['Assets/css/plugins/datapicker/angular-datapicker.css',
        //                            'Assets/js/plugins/datapicker/datePicker.js']
        //                },
        //                {
        //                    files: ['Assets/js/plugins/jasny/jasny-bootstrap.min.js']
        //                },
        //                {
        //                    name: 'ui.switchery',
        //                    files: ['Assets/css/plugins/switchery/switchery.css',
        //                        'Assets/js/plugins/switchery/switchery.js',
        //                        'Assets/js/plugins/switchery/ng-switchery.js']
        //                },
        //                {
        //                    name: 'colorpicker.module',
        //                    files: ['Assets/css/plugins/colorpicker/colorpicker.css', 'Assets/js/plugins/colorpicker/bootstrap-colorpicker-module.js']
        //                },
        //                {
        //                    name: 'ngImgCrop',
        //                    files: ['Assets/js/plugins/ngImgCrop/ng-img-crop.js',
        //                        'Assets/css/plugins/ngImgCrop/ng-img-crop.css']
        //                }

        //            ]);
        //        }
        //    }
        //})
        //.state('forms.wizard', {
        //    url: "/wizard",
        //    templateUrl: "views/form_wizard.html",
        //    controller: wizardCtrl,
        //    data: { pageTitle: 'Wizard form' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/css/plugins/steps/jquery.steps.css']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('forms.wizard.step_one', {
        //    url: '/step_one',
        //    templateUrl: 'views/wizard/step_one.html',
        //    data: { pageTitle: 'Wizard form' }
        //})
        //.state('forms.wizard.step_two', {
        //    url: '/step_two',
        //    templateUrl: 'views/wizard/step_two.html',
        //    data: { pageTitle: 'Wizard form' }
        //})
        //.state('forms.wizard.step_three', {
        //    url: '/step_three',
        //    templateUrl: 'views/wizard/step_three.html',
        //    data: { pageTitle: 'Wizard form' }
        //})
        //.state('forms.file_upload', {
        //    url: "/file_upload",
        //    templateUrl: "views/form_file_upload.html",
        //    data: { pageTitle: 'File upload' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/css/plugins/dropzone/basic.css', 'Assets/css/plugins/dropzone/dropzone.css', 'Assets/js/plugins/dropzone/dropzone.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('forms.text_editor', {
        //    url: "/text_editor",
        //    templateUrl: "views/form_editors.html",
        //    data: { pageTitle: 'Text editor' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'summernote',
        //                    files: ['Assets/css/plugins/summernote/summernote.css',
        //                        'Assets/css/plugins/summernote/summernote-bs3.css',
        //                        'Assets/js/plugins/summernote/summernote.min.js',
        //                        'Assets/js/plugins/summernote/angular-summernote.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('app', {
        //    abstract: true,
        //    url: "/app",
        //    templateUrl: "views/common/content.html",
        //})
        //.state('app.contacts', {
        //    url: "/contacts",
        //    templateUrl: "views/contacts.html",
        //    data: { pageTitle: 'Contacts' }
        //})
        //.state('app.profile', {
        //    url: "/profile",
        //    templateUrl: "views/profile.html",
        //    data: { pageTitle: 'Profile' }
        //})
        //.state('app.projects', {
        //    url: "/projects",
        //    templateUrl: "views/projects.html",
        //    data: { pageTitle: 'Projects' }
        //})
        //.state('app.project_detail', {
        //    url: "/project_detail",
        //    templateUrl: "views/project_detail.html",
        //    data: { pageTitle: 'Project detail' }
        //})
        //.state('app.file_manager', {
        //    url: "/file_manager",
        //    templateUrl: "views/file_manager.html",
        //    data: { pageTitle: 'File manager' }
        //})
        //.state('app.calendar', {
        //    url: "/calendar",
        //    templateUrl: "views/calendar.html",
        //    data: { pageTitle: 'Calendar' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    insertBefore: '#loadBefore',
        //                    files: ['Assets/css/plugins/fullcalendar/fullcalendar.css',
        //                        'Assets/js/plugins/fullcalendar/fullcalendar.min.js',
        //                        'Assets/js/plugins/fullcalendar/gcal.js']
        //                },
        //                {
        //                    name: 'ui.calendar',
        //                    files: ['Assets/js/plugins/fullcalendar/calendar.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('app.faq', {
        //    url: "/faq",
        //    templateUrl: "views/faq.html",
        //    data: { pageTitle: 'FAQ' }
        //})
        //.state('app.timeline', {
        //    url: "/timeline",
        //    templateUrl: "views/timeline.html",
        //    data: { pageTitle: 'Timeline' }
        //})
        //.state('app.pin_board', {
        //    url: "/pin_board",
        //    templateUrl: "views/pin_board.html",
        //    data: { pageTitle: 'Pin board' }
        //})
        //.state('app.invoice', {
        //    url: "/invoice",
        //    templateUrl: "views/invoice.html",
        //    data: { pageTitle: 'Invoice' }
        //})
        //.state('app.blog', {
        //    url: "/blog",
        //    templateUrl: "views/blog.html",
        //    data: { pageTitle: 'Blog' }
        //})
        //.state('app.article', {
        //    url: "/article",
        //    templateUrl: "views/article.html",
        //    data: { pageTitle: 'Article' }
        //})
        //.state('app.issue_tracker', {
        //    url: "/issue_tracker",
        //    templateUrl: "views/issue_tracker.html",
        //    data: { pageTitle: 'Issue Tracker' }
        //})
        //.state('app.clients', {
        //    url: "/clients",
        //    templateUrl: "views/clients.html",
        //    data: { pageTitle: 'Clients' }
        //})
        //.state('app.teams_board', {
        //    url: "/teams_board",
        //    templateUrl: "views/teams_board.html",
        //    data: { pageTitle: 'Teams board' }
        //})
        //.state('pages', {
        //    abstract: true,
        //    url: "/pages",
        //    templateUrl: "views/common/content.html",
        //})
        //.state('pages.search_results', {
        //    url: "/search_results",
        //    templateUrl: "views/search_results.html",
        //    data: { pageTitle: 'Search results' }
        //})
        //.state('pages.empy_page', {
        //    url: "/empy_page",
        //    templateUrl: "views/empty_page.html",
        //    data: { pageTitle: 'Empty page' }
        //})
        //.state('ui', {
        //    abstract: true,
        //    url: "/ui",
        //    templateUrl: "views/common/content.html",
        //})
        //.state('ui.typography', {
        //    url: "/typography",
        //    templateUrl: "views/typography.html",
        //    data: { pageTitle: 'Typography' }
        //})
        //.state('ui.icons', {
        //    url: "/icons",
        //    templateUrl: "views/icons.html",
        //    data: { pageTitle: 'Icons' }
        //})
        //.state('ui.buttons', {
        //    url: "/buttons",
        //    templateUrl: "views/buttons.html",
        //    data: { pageTitle: 'Buttons' }
        //})
        //.state('ui.tabs_panels', {
        //    url: "/tabs_panels",
        //    templateUrl: "views/tabs_panels.html",
        //    data: { pageTitle: 'Tabs and panels' }
        //})
        //.state('ui.notifications_tooltips', {
        //    url: "/notifications_tooltips",
        //    templateUrl: "views/notifications.html",
        //    data: { pageTitle: 'Notifications and tooltips' }
        //})
        //.state('ui.badges_labels', {
        //    url: "/badges_labels",
        //    templateUrl: "views/badges_labels.html",
        //    data: { pageTitle: 'Badges and labels and progress' }
        //})
        //.state('ui.video', {
        //    url: "/video",
        //    templateUrl: "views/video.html",
        //    data: { pageTitle: 'Responsible Video' }
        //})
        //.state('ui.draggable', {
        //    url: "/draggable",
        //    templateUrl: "views/draggable.html",
        //    data: { pageTitle: 'Draggable panels' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'ui.sortable',
        //                    files: ['Assets/js/plugins/ui-sortable/sortable.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('grid_options', {
        //    url: "/grid_options",
        //    templateUrl: "views/grid_options.html",
        //    data: { pageTitle: 'Grid options' }
        //})
        //.state('miscellaneous', {
        //    abstract: true,
        //    url: "/miscellaneous",
        //    templateUrl: "views/common/content.html",
        //})
        //.state('miscellaneous.google_maps', {
        //    url: "/google_maps",
        //    templateUrl: "views/google_maps.html",
        //    data: { pageTitle: 'Google maps' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'ui.event',
        //                    files: ['Assets/js/plugins/uievents/event.js']
        //                },
        //                {
        //                    name: 'ui.map',
        //                    files: ['Assets/js/plugins/uimaps/ui-map.js']
        //                },
        //            ]);
        //        }
        //    }
        //})
        //.state('miscellaneous.code_editor', {
        //    url: "/code_editor",
        //    templateUrl: "views/code_editor.html",
        //    data: { pageTitle: 'Code Editor' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    serie: true,
        //                    files: ['Assets/css/plugins/codemirror/codemirror.css',
        //                        'Assets/css/plugins/codemirror/ambiance.css',
        //                        'Assets/js/plugins/codemirror/codemirror.js',
        //                        'Assets/js/plugins/codemirror/mode/javascript/javascript.js']
        //                },
        //                {
        //                    name: 'ui.codemirror',
        //                    files: ['Assets/js/plugins/ui-codemirror/ui-codemirror.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('miscellaneous.modal_window', {
        //    url: "/modal_window",
        //    templateUrl: "views/modal_window.html",
        //    data: { pageTitle: 'Modal window' }
        //})
        //.state('miscellaneous.chat_view', {
        //    url: "/chat_view",
        //    templateUrl: "views/chat_view.html",
        //    data: { pageTitle: 'Chat view' }
        //})
        //.state('miscellaneous.nestable_list', {
        //    url: "/nestable_list",
        //    templateUrl: "views/nestable_list.html",
        //    data: { pageTitle: 'Nestable List' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'ui.tree',
        //                    files: ['Assets/css/plugins/uiTree/angular-ui-tree.min.css', 'Assets/js/plugins/uiTree/angular-ui-tree.min.js']
        //                },
        //            ]);
        //        }
        //    }
        //})
        //.state('miscellaneous.notify', {
        //    url: "/notify",
        //    templateUrl: "views/notify.html",
        //    data: { pageTitle: 'Notifications for angularJS' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'cgNotify',
        //                    files: ['Assets/css/plugins/angular-notify/angular-notify.min.css',
        //                        'Assets/js/plugins/angular-notify/angular-notify.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('miscellaneous.timeline_2', {
        //    url: "/timeline_2",
        //    templateUrl: "views/timeline_2.html",
        //    data: { pageTitle: 'Timeline version 2' }
        //})
        //.state('miscellaneous.forum_view', {
        //    url: "/forum_view",
        //    templateUrl: "views/forum_view.html",
        //    data: { pageTitle: 'Forum - general view' }
        //})
        //.state('miscellaneous.forum_post_view', {
        //    url: "/forum_post_view",
        //    templateUrl: "views/forum_post_view.html",
        //    data: { pageTitle: 'Forum - post view' }
        //})
        //.state('miscellaneous.diff', {
        //    url: "/diff",
        //    templateUrl: "views/diff.html",
        //    data: { pageTitle: 'Text Diff' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/js/plugins/diff_match_patch/javascript/diff_match_patch.js']
        //                },
        //                {
        //                    name: 'diff-match-patch',
        //                    files: ['Assets/js/plugins/angular-diff-match-patch/angular-diff-match-patch.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('miscellaneous.idle_timer', {
        //    url: "/idle_timer",
        //    templateUrl: "views/idle_timer.html",
        //    data: { pageTitle: 'Idle timer' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'cgNotify',
        //                    files: ['Assets/css/plugins/angular-notify/angular-notify.min.css',
        //                        'Assets/js/plugins/angular-notify/angular-notify.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('miscellaneous.live_favicon', {
        //    url: "/live_favicon",
        //    templateUrl: "views/live_favicon.html",
        //    data: { pageTitle: 'Live favicon' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/js/plugins/tinycon/tinycon.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('miscellaneous.spinners', {
        //    url: "/spinners",
        //    templateUrl: "views/spinners.html",
        //    data: { pageTitle: 'Spinners' }
        //})
        //.state('miscellaneous.validation', {
        //    url: "/validation",
        //    templateUrl: "views/validation.html",
        //    data: { pageTitle: 'Validation' }
        //})
        //.state('miscellaneous.agile_board', {
        //    url: "/agile_board",
        //    templateUrl: "views/agile_board.html",
        //    data: { pageTitle: 'Agile board' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'ui.sortable',
        //                    files: ['Assets/js/plugins/ui-sortable/sortable.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('tables', {
        //    abstract: true,
        //    url: "/tables",
        //    templateUrl: "views/common/content.html",
        //})
        //.state('tables.static_table', {
        //    url: "/static_table",
        //    templateUrl: "views/table_basic.html",
        //    data: { pageTitle: 'Static table' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'angular-peity',
        //                    files: ['Assets/js/plugins/peity/jquery.peity.min.js', 'Assets/js/plugins/peity/angular-peity.js']
        //                },
        //                {
        //                    files: ['Assets/css/plugins/iCheck/custom.css', 'Assets/js/plugins/iCheck/icheck.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('tables.data_tables', {
        //    url: "/data_tables",
        //    templateUrl: "views/table_data_tables.html",
        //    data: { pageTitle: 'Data Tables' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    seria: true,
        //                    files: ['Assets/js/plugins/dataTables/jquery.dataTables.js', 'Assets/css/plugins/dataTables/dataTables.bootstrap.css']
        //                },
        //                {
        //                    files: ['Assets/js/plugins/dataTables/dataTables.bootstrap.js']
        //                },
        //                {
        //                    name: 'datatables',
        //                    files: ['Assets/js/plugins/dataTables/angular-datatables.min.js']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('tables.nggrid', {
        //    url: "/nggrid",
        //    templateUrl: "views/nggrid.html",
        //    data: { pageTitle: 'ng Grid' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'ngGrid',
        //                    files: ['Assets/js/plugins/nggrid/ng-grid-2.0.3.min.js']
        //                },
        //                {
        //                    insertBefore: '#loadBefore',
        //                    files: ['Assets/js/plugins/nggrid/ng-grid.css']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('gallery', {
        //    abstract: true,
        //    url: "/gallery",
        //    templateUrl: "views/common/content.html",
        //})
        //.state('gallery.basic_gallery', {
        //    url: "/basic_gallery",
        //    templateUrl: "views/basic_gallery.html",
        //    data: { pageTitle: 'Lightbox Gallery' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: ['Assets/js/plugins/blueimp/jquery.blueimp-gallery.min.js',
        //                        'Assets/css/plugins/blueimp/css/blueimp-gallery.min.css']
        //                }
        //            ]);
        //        }
        //    }
        //})
        //.state('gallery.bootstrap_carousel', {
        //    url: "/bootstrap_carousel",
        //    templateUrl: "views/carousel.html",
        //    data: { pageTitle: 'Bootstrap carousel' }
        //})
        //.state('css_animations', {
        //    url: "/css_animations",
        //    templateUrl: "views/css_animation.html",
        //    data: { pageTitle: 'CSS Animations' },
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    reconfig: true,
        //                    serie: true,
        //                    files: ['Assets/js/plugins/rickshaw/vendor/d3.v3.js', 'Assets/js/plugins/rickshaw/rickshaw.min.js']
        //                },
        //                {
        //                    reconfig: true,
        //                    name: 'angular-rickshaw',
        //                    files: ['Assets/js/plugins/rickshaw/angular-rickshaw.js']
        //                }
        //            ]);
        //        }
        //    }

        //});
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
