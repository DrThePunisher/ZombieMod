/// <reference path="../CustomKnockout/WideSpinnerViewModel.js" />
/// <reference path="../Managers/ZombieModManager.js" />

var debugVm = null;
$(function () {
    zombieMod.customKnockout.require.wideSpinner();

    var Turn = function (parameters) {
        var self = this;

        var settings = $.extend({
            number: 0,
            color: 'btn-turn-blue',
            deck: 1
        }, parameters);

        self.number = settings.number;
        self.color = settings.color;
        self.deck = settings.deck;
        self.history = ko.observableArray([]);
        self.iscurrentTurn = ko.observable(false);
        self.iscurrentTurnInfo = ko.observable(false);
        self.icon = ko.pureComputed(function () {
            if (self.iscurrentTurn()) {
                return 'glyphicon-exclamation-sign';
            } else if (self.iscurrentTurnInfo()) {
                return 'glyphicon-eye-open';
            } else return '';
        });
    };

    var vm = {
        loading: ko.observable(false),
        currentDeck: ko.observable('No Deck'),
        currentDeckId: ko.observable(1),
        cards: ko.observableArray(),
        chosenCard: ko.observable(),
        spawnButtonsEnabled: ko.pureComputed(function () {
            return !vm.gameSetup() && !vm.loading();
        }),
        spawnZombies: function () {
            vm.newTurn(false);
            vm.selectCard(true);
            if (vm.spawnsLeftInTurn() === 1) {
                vm.spawnsLeftInTurn(vm.spinners.activeSpawnCount.getValue());
                if (vm.turn() === vm.maxTurns()) {
                    // Create new red turn
                    vm.turns.push(new Turn({
                        number: Number(vm.turn() + 1),
                        color: 'btn-turn-red',
                        deck: 4
                    }));
                }
                vm.setTurn(Number(vm.turn() + 1));
                vm.newTurn(true);
            } else {
                vm.spawnsLeftInTurn(Number(vm.spawnsLeftInTurn() - 1));
            }
        },
        selectCard: function (spawn) {
            vm.setTurnInfo(vm.turn());
            if (vm.cards().length === 0) {
                vm.chosenCard(null);
                vm.jumbotronMessage('Reshuffling...');
                getDeck(vm.currentDeckId(), function () {
                    vm.selectCard(spawn);
                });
                return;
            } else {
                var randomCard = vm.cards()[Math.floor(Math.random() * vm.cards().length)];
                vm.jumbotronMessage(randomCard.Info);
                if (spawn) {
                    randomCard.Info += ' (Spawn)';
                }
                vm.chosenCard(randomCard);
                vm.cards.remove(randomCard);
            }
        },
        jumbotronMessage: ko.observable('Zombies!!!'),
        jumbotronGlow: ko.observable('jumbotron-blue'),
        spinners: {
            activeSpawnCount: new zombieMod.wideSpinnerViewModel({
                label: 'Active Spawns', value: 4, min: 1
            }),
            blueSpawnCount: new zombieMod.wideSpinnerViewModel({
                label: '# of Blue Spawns', value: 5, min: 1
            }),
            yellowSpawnCount: new zombieMod.wideSpinnerViewModel({
                label: '# of Yellow Spawns', value: 4, min: 1
            }),
            orangeSpawnCount: new zombieMod.wideSpinnerViewModel({
                label: '# of Orange Spawns', value: 4, min: 1
            })
        },
        spawnsLeftInTurn: ko.observable(4),
        newTurn: ko.observable(true),
        turn: ko.observable(1),
        maxTurns: ko.pureComputed(function () {
            return vm.turns().length;
        }),
        turns: ko.observableArray(),
        turnList: ko.observableArray(),
        currentTurn: ko.observable(),
        currentTurnInfo: ko.observable(),
        setTurn: function (num) {
            if (vm.currentTurn()) {
                vm.currentTurn().iscurrentTurn(false);
            }
            var turnObject = ko.utils.arrayFirst(vm.turns(), function (turn) {
                return turn.number === num;
            });
            vm.currentTurn(turnObject);
            vm.currentTurn().iscurrentTurn(true);
            vm.turn(num);
        },
        setTurnInfo: function (num) {
            if (vm.currentTurnInfo()) {
                vm.currentTurnInfo().iscurrentTurnInfo(false);
            }
            var turnObject = ko.utils.arrayFirst(vm.turns(), function (turn) {
                return turn.number === num;
            });
            vm.currentTurnInfo(turnObject);
            vm.currentTurnInfo().iscurrentTurnInfo(true);
        },
        gameSetup: ko.observable(true),
        startGame: function () {
            vm.spinners.blueSpawnCount.buttonsEnabled(false);
            vm.spinners.yellowSpawnCount.buttonsEnabled(false);
            vm.spinners.orangeSpawnCount.buttonsEnabled(false);
            vm.setTurn(1);
            vm.setTurnInfo(1);
            getDeck(1);
            vm.gameSetup(false);
        }
    };
    vm.chosenCard.subscribe(function (newCard) {
        var power = 0;
        if (newCard) {
            newCard.Spawns.forEach(function (spawn) {
                power += (Number(spawn.Count) * Number(spawn.ZombieClass.BasePower) * Number(spawn.ZombieType.PowerMultiplier));
            });
            if (newCard.Sewer) {
                power *= 2;
            }
            //newCard.Info += ' Power: ' + power.toFixed(1);
            vm.currentTurn().history.unshift(newCard);
        }
    });
    vm.spinners.blueSpawnCount.value.subscribe(function () {
        initializeTurns();
    });
    vm.spinners.yellowSpawnCount.value.subscribe(function () {
        initializeTurns();
    });
    vm.spinners.orangeSpawnCount.value.subscribe(function () {
        initializeTurns();
    });
    vm.spinners.activeSpawnCount.value.subscribe(function (val) {
        if (vm.newTurn()) {
            vm.spawnsLeftInTurn(val);
        }
    });
    vm.spinners.activeSpawnCount.buttonsEnabled = vm.newTurn;
    vm.currentDeckId.subscribe(function (val) {
        getDeck(val);
        if (val === 1) {
            vm.jumbotronGlow('jumbotron-blue');
        } else if (val === 2) {
            vm.jumbotronGlow('jumbotron-yellow');
        } else if (val === 3) {
            vm.jumbotronGlow('jumbotron-orange');
        } else if (val === 4) {
            vm.jumbotronGlow('jumbotron-red');
        }
    });
    vm.currentTurn.subscribe(function (turn) {
        vm.currentDeckId(turn.deck);
    });

    var initializeTurns = function () {
        vm.turns.removeAll();
        var turnNumber = 1;
        for (var b = 0; b < vm.spinners.blueSpawnCount.getValue() ; b++) {
            vm.turns.push(new Turn({
                number: Number(turnNumber++),
                color: 'btn-turn-blue',
                deck: 1
            }));
        }
        for (var y = 0; y < vm.spinners.yellowSpawnCount.getValue() ; y++) {
            vm.turns.push(new Turn({
                number: Number(turnNumber++),
                color: 'btn-turn-yellow',
                deck: 2
            }));
        }
        for (var o = 0; o < vm.spinners.orangeSpawnCount.getValue() ; o++) {
            vm.turns.push(new Turn({
                number: Number(turnNumber++),
                color: 'btn-turn-orange',
                deck: 3
            }));
        }
        vm.turns.push(new Turn({
            number: Number(turnNumber),
            color: 'btn-turn-red',
            deck: 4
        }));

        vm.setTurn(1);
        vm.setTurnInfo(1);
    }

    // Init
    var init = function () {
        initializeTurns();

        $(document).on('keydown', function (e) {
            var event = window.event ? window.event : e;
            // Enter
            if (event.keyCode === 13) {
                vm.startGame();
            }
            if (!vm.gameSetup() && !vm.loading()) {
                // Z or T
                if (event.keyCode === 90 || event.keyCode === 84) {
                    vm.spawnZombies();
                }
                // B
                if (event.keyCode === 66) {
                    vm.selectCard();
                }
            }
            if (vm.spinners.activeSpawnCount.buttonsEnabled()) {
                // Left Arrow
                if (event.keyCode === 37) {
                    vm.spinners.activeSpawnCount.left();
                }
                // Right Arrow
                if (event.keyCode === 39) {
                    vm.spinners.activeSpawnCount.right();
                }
            }
        });
    };

    // ajax functions
    var getDeck = function (deckId, callback) {
        vm.loading(true);
        zombieMod.zombieModManager.getDeck(deckId)
            .done(function (response) {
                response = JSON.parse(response);
                if (response.Success) {
                    vm.currentDeck(response.Data.Name);
                    vm.cards(response.Data.Cards);
                    if ($.isFunction(callback)) {
                        callback();
                    }
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