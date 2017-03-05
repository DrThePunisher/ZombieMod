/// <reference path="../CustomKnockout/WideSpinnerViewModel.js" />
/// <reference path="../Managers/ZombieModManager.js" />

var debugVm = null;
$(function () {
    zombieMod.customKnockout.require.wideSpinner();

    var vm = {
        allDeckOptions: ko.observableArray(),
        selectedDeckOption: ko.observable(),
        currentDeckName: ko.observable(),
        currentDeckCards: ko.observableArray(),
        loading: ko.observable(false)
    };
    vm.selectedDeckOption.subscribe(function (newValue) {
        getDeck(newValue);
    });

    var init = function () {
        getAllDecks();
    };

    var getAllDecks = function () {
        vm.loading(true);
        zombieMod.zombieModManager.getAllDecks()
            .done(function (response) {
                response = JSON.parse(response);
                if (response.Success) {
                    vm.allDeckOptions(response.Data);
                } else {
                    console.log(response.Message);
                }
                vm.loading(false);
            });
    }

    var getDeck = function (deckId) {
        vm.loading(true);
        zombieMod.zombieModManager.getDeck(deckId)
            .done(function (response) {
                response = JSON.parse(response);
                if (response.Success) {
                    vm.currentDeckName(response.Data.Name);
                    vm.currentDeckCards(response.Data.Cards);
                } else {
                    console.log(response.Message);
                }
                vm.loading(false);
            });
    }

    // Set up
    init();
    ko.applyBindings(vm);
    debugVm = vm;
});