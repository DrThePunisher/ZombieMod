var zombieMod = zombieMod || {};

zombieMod.zombieModManager = {
    deferredList: [], // Cached list of deferred based on deck id
    getAllDecks: function () {
        var key = 'getDecks';
        // Get or create the deferred object
        var _deferred = this.deferredList[key];
        if (!this.deferredList[key]) {
            _deferred = $.Deferred();
            this.deferredList[key] = _deferred;
        }

        // If the deferred still needs to execute
        if (_deferred.state() === 'pending') {
            $.ajax({
                url: '/ZombieMod/GetAllDecks/',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).done(function (response) {
                _deferred.resolve(response);
            }).fail(function (error) {
                _deferred.reject(error);
            });
        }

        // Return the promise
        return _deferred.promise();
    },
    getDeck: function (deckId) {
        var key = 'getDeck-' + deckId;
        // Get or create the deferred object
        var _deferred = this.deferredList[key];
        if (!this.deferredList[key]) {
            _deferred = $.Deferred();
            this.deferredList[key] = _deferred;
        }

        // If the deferred still needs to execute
        if (_deferred.state() === 'pending') {
            $.ajax({
                url: '/ZombieMod/GetDeck/' + deckId,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).done(function (response) {
                _deferred.resolve(response);
            }).fail(function (error) {
                _deferred.reject(error);
            });
        }

        // Return the promise
        return _deferred.promise();
    }
};