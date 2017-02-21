var ZombieMod = ZombieMod || {};

ZombieMod.WideSpinnerViewModel = function (parameters) {
    var self = this;

    var settings = $.extend({
        label: "Wide Spinner",
        value: 1,
        min: 1,
        max: null
    }, parameters);

    self.buttonsEnabled = ko.observable(true);
    self.label = settings.label;
    self.value = ko.observable(settings.value);
    self.min = ko.observable(settings.min);
    self.max = ko.observable(settings.max);
    self.left = function () {
        var newVal = Math.floor(Number(self.value()) - 1);
        if (!self.min || newVal >= self.min())
            self.value(newVal);
    };
    self.right = function () {
        var newVal = Math.floor(Number(self.value()) + 1);
        if (!self.max() || newVal <= self.max())
            self.value(newVal);
    };
    self.getValue = function () {
        return Number(self.value());
    };
};