/// <reference path="../CustomKnockout/WideSpinnerViewModel.js" />
var debugVm = null;
$(function () {
    ZombieMod.CustomKnockout.Require.WideSpinner();

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
        self.isCurrentTurn = ko.observable(false);
        self.isCurrentTurnInfo = ko.observable(false);
        self.icon = ko.pureComputed(function () {
            if (self.isCurrentTurn()) {
                return 'glyphicon-exclamation-sign';
            } else if (self.isCurrentTurnInfo()) {
                return 'glyphicon-eye-open';
            } else return '';
        });
    };

    var vm = {
        Loading: ko.observable(false),
        CurrentDeck: ko.observable('No Deck'),
        CurrentDeckId: ko.observable(1),
        Cards: ko.observableArray(),
        ChosenCard: ko.observable(),
        SpawnButtonsEnabled: ko.pureComputed(function () {
            return !vm.GameSetup() && !vm.Loading();
        }),
        SpawnZombies: function () {
            vm.NewTurn(false);
            vm.SelectCard(true);
            if (vm.SpawnsLeftInTurn() === 1) {
                vm.SpawnsLeftInTurn(vm.Spinners.ActiveSpawnCount.getValue());
                if (vm.Turn() === vm.MaxTurns()) {
                    // Create new red turn
                    vm.Turns.push(new Turn({
                        number: Number(vm.Turn() + 1),
                        color: 'btn-turn-red',
                        deck: 4
                    }));
                }
                vm.SetTurn(Number(vm.Turn() + 1));
                vm.NewTurn(true);
            } else {
                vm.SpawnsLeftInTurn(Number(vm.SpawnsLeftInTurn() - 1));
            }
        },
        SelectCard: function (spawn) {
            vm.SetTurnInfo(vm.Turn());
            if (vm.Cards().length === 0) {
                vm.ChosenCard(null);
                vm.JumbotronMessage('Reshuffling...');
                getDeck(vm.CurrentDeckId(), function () {
                    vm.SelectCard(spawn);
                });
                return;
            } else {
                var randomCard = vm.Cards()[Math.floor(Math.random() * vm.Cards().length)];
                vm.JumbotronMessage(randomCard.Info);
                if (spawn) {
                    randomCard.Info += ' (Spawn)';
                }
                vm.ChosenCard(randomCard);
                vm.Cards.remove(randomCard);
            }
        },
        JumbotronMessage: ko.observable('Zombies!!!'),
        JumbotronGlow: ko.observable('jumbotron-blue'),
        Spinners: {
            ActiveSpawnCount: new ZombieMod.WideSpinnerViewModel({
                label: 'Active Spawns', value: 4, min: 1
            }),
            BlueSpawnCount: new ZombieMod.WideSpinnerViewModel({
                label: '# of Blue Spawns', value: 5, min: 1
            }),
            YellowSpawnCount: new ZombieMod.WideSpinnerViewModel({
                label: '# of Yellow Spawns', value: 4, min: 1
            }),
            OrangeSpawnCount: new ZombieMod.WideSpinnerViewModel({
                label: '# of Orange Spawns', value: 4, min: 1
            })
        },
        SpawnsLeftInTurn: ko.observable(4),
        NewTurn: ko.observable(true),
        Turn: ko.observable(1),
        MaxTurns: ko.pureComputed(function () {
            return vm.Turns().length;
        }),
        Turns: ko.observableArray(),
        TurnList: ko.observableArray(),
        CurrentTurn: ko.observable(),
        CurrentTurnInfo: ko.observable(),
        SetTurn: function (num) {
            if (vm.CurrentTurn()) {
                vm.CurrentTurn().isCurrentTurn(false);
            }
            var turnObject = ko.utils.arrayFirst(vm.Turns(), function (turn) {
                return turn.number === num;
            });
            vm.CurrentTurn(turnObject);
            vm.CurrentTurn().isCurrentTurn(true);
            vm.Turn(num);
        },
        SetTurnInfo: function (num) {
            if (vm.CurrentTurnInfo()) {
                vm.CurrentTurnInfo().isCurrentTurnInfo(false);
            }
            var turnObject = ko.utils.arrayFirst(vm.Turns(), function (turn) {
                return turn.number === num;
            });
            vm.CurrentTurnInfo(turnObject);
            vm.CurrentTurnInfo().isCurrentTurnInfo(true);
        },
        GameSetup: ko.observable(true),
        StartGame: function () {
            vm.Spinners.BlueSpawnCount.buttonsEnabled(false);
            vm.Spinners.YellowSpawnCount.buttonsEnabled(false);
            vm.Spinners.OrangeSpawnCount.buttonsEnabled(false);
            vm.SetTurn(1);
            vm.SetTurnInfo(1);
            getDeck(1);
            vm.GameSetup(false);
        }
    };
    vm.ChosenCard.subscribe(function (newCard) {
        var power = 0;
        if (newCard) {
            newCard.Spawns.forEach(function (spawn) {
                power += (Number(spawn.Count) * Number(spawn.ZombieClass.BasePower) * Number(spawn.ZombieType.PowerMultiplier));
            });
            if (newCard.Sewer) {
                power *= 2;
            }
            //newCard.Info += ' Power: ' + power.toFixed(1);
            vm.CurrentTurn().history.unshift(newCard);
        }
    });
    vm.Spinners.BlueSpawnCount.value.subscribe(function () {
        initializeTurns();
    });
    vm.Spinners.YellowSpawnCount.value.subscribe(function () {
        initializeTurns();
    });
    vm.Spinners.OrangeSpawnCount.value.subscribe(function () {
        initializeTurns();
    });
    vm.Spinners.ActiveSpawnCount.value.subscribe(function (val) {
        if (vm.NewTurn()) {
            vm.SpawnsLeftInTurn(val);
        }
    });
    vm.Spinners.ActiveSpawnCount.buttonsEnabled = vm.NewTurn;
    vm.CurrentDeckId.subscribe(function (val) {
        getDeck(val);
        if (val === 1) {
            vm.JumbotronGlow('jumbotron-blue');
        } else if (val === 2) {
            vm.JumbotronGlow('jumbotron-yellow');
        } else if (val === 3) {
            vm.JumbotronGlow('jumbotron-orange');
        } else if (val === 4) {
            vm.JumbotronGlow('jumbotron-red');
        }
    });
    vm.CurrentTurn.subscribe(function (turn) {
        vm.CurrentDeckId(turn.deck);
    });

    var initializeTurns = function () {
        vm.Turns.removeAll();
        var turnNumber = 1;
        for (var b = 0; b < vm.Spinners.BlueSpawnCount.getValue() ; b++) {
            vm.Turns.push(new Turn({
                number: Number(turnNumber++),
                color: 'btn-turn-blue',
                deck: 1
            }));
        }
        for (var y = 0; y < vm.Spinners.YellowSpawnCount.getValue() ; y++) {
            vm.Turns.push(new Turn({
                number: Number(turnNumber++),
                color: 'btn-turn-yellow',
                deck: 2
            }));
        }
        for (var o = 0; o < vm.Spinners.OrangeSpawnCount.getValue() ; o++) {
            vm.Turns.push(new Turn({
                number: Number(turnNumber++),
                color: 'btn-turn-orange',
                deck: 3
            }));
        }
        vm.Turns.push(new Turn({
            number: Number(turnNumber),
            color: 'btn-turn-red',
            deck: 4
        }));

        vm.SetTurn(1);
        vm.SetTurnInfo(1);
    }

    // Init
    var init = function () {
        initializeTurns();

        $(document).on('keydown', function (e) {
            var event = window.event ? window.event : e;
            // Enter
            if (event.keyCode === 13) {
                vm.StartGame();
            }
            if (!vm.GameSetup() && !vm.Loading()) {
                // Z
                if (event.keyCode === 90) {
                    vm.SpawnZombies();
                }
                // B
                if (event.keyCode === 66) {
                    vm.SelectCard();
                }
            }
            if (vm.Spinners.ActiveSpawnCount.buttonsEnabled()) {
                // Left Arrow
                if (event.keyCode === 37) {
                    vm.Spinners.ActiveSpawnCount.left();
                }
                // Right Arrow
                if (event.keyCode === 39) {
                    vm.Spinners.ActiveSpawnCount.right();
                }
            }
        });
    };

    // ajax functions
    var getDeck = function (deckId, callback) {
        vm.Loading(true);
        $.ajax({
            url: '/ZombieMod/GetDeck/' + deckId,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
                response = JSON.parse(response);
                vm.CurrentDeck(response.Data.Name);
                if (response.Success) {
                    vm.Cards(response.Data.Cards);
                    if ($.isFunction(callback)) {
                        callback();
                    }
                } else {
                    console.log(response.Message);
                }
                vm.Loading(false);
            }
        });
    }

    // Set up
    init();
    ko.applyBindings(vm);
    debugVm = vm;
});