var ZombieMod = ZombieMod || {};

ZombieMod.CustomKnockout = {
    Require: {
        WideSpinner: function () {
            if (!ko.components.isRegistered('wide-spinner')) {
                ko.components.register('wide-spinner', {
                    viewModel: {
                        createViewModel: function (params) {
                            return params.value;
                        }
                    },
                    template: '<label data-bind="text: label"></label>\
                               <div class="input-group">\
                                   <div class="input-group-btn">\
                                       <button class="btn btn-primary" data-bind="click: left, enable: buttonsEnabled" style="cursor: default"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>\
                                   </div>\
                                   <input class="form-control" data-bind="value: value" style="width: 5em; text-align: center; cursor: default" disabled>\
                                   <div class="input-group-btn pull-left">\
                                       <button class="btn btn-primary" data-bind="click: right, enable: buttonsEnabled" style="cursor: default"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>\
                                   </div>\
                               </div>'
                });
            }
        }
    }
};