var zombieMod = zombieMod || {};

zombieMod.zombieModManager = {
    deferredList: [], // Cached list of deferred based on deck id
    getDeck: function (deckId) {
        // Get or create the deferred object
        var _deferred = this.deferredList[deckId];
        if (!this.deferredList[deckId]) {
            _deferred = $.Deferred();
            this.deferredList[deckId] = _deferred;
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