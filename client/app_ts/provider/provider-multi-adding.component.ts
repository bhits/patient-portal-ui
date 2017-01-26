import {Component} from '@angular/core';

@Component({
    selector: 'c2s-provider-multi-adding',
    template:`
                <div class="col-sm-6 col-sm-push-6">
                    <div class="ibox panel panel-darkblue">
                        <div class="ibox-title modified panel-heading">
                            <h2 class="font-light">Selections to Add</h2>
                        </div>
                        <div class="panel-body">
                
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <td></td>
                                            <th>Name/Facility</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <span class="sr-only">empty table cell</span>
                                            </td>
                                            <td>
                                                <span>No Providers currently selected.</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <td></td>
                                            <th>Name/Facility</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-xs btn-red">
                                                    <div class="fa fa-minus">
                                                        <span class="sr-only">delete provider</span>
                                                        <span class="sr-only"></span>
                                                        <span class="sr-only"></span>
                                                    </div>
                                                </button>
                                            </td>
                                            <td>
                                                <span>FISHKIN CENTER FOR BACK AND BODY WELLNESS, LLC</span>
                                            </td>
                                        </tr>
                
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-xs btn-red">
                                                    <div class="fa fa-minus">
                                                        <span class="sr-only">delete provider</span>
                                                        <span class="sr-only"></span>
                                                        <span class="sr-only"></span>
                                                    </div>
                                                </button>
                                            </td>
                                            <td>
                                                <span>DRS. GOLDBAUM AND ROSENBERG</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row m-b-sm">
                                <div class="col-sm-12">
                                    <button class="btn btn-sm btn-primary dark-green">Add to Provider List</button>
                                </div>
                            </div>
                
                        </div>
                    </div>
                </div>
            `
})

export class ProviderMultiAddingComponent {
}