
/**
 * Construct a new Firebase reference from a full Firebase URL.
 * @constructor
 * @param {string} url The absolute, HTTPS URL of a Firebase location.
 */
function Firebase(url) {};


/**
 * Authenticates a Firebase Client using a provided Authentication Token.
 * @param {string} authToken An authentication token.
 * @param {Function=} opt_onComplete A callback function that will be called
 *     when authentication has completed. On failure,
 *     the first argument will be an Error object
 *     indicating the failure. On success, the first argument
 *     will be null and the second will be an object containing
 *     {
 *       auth: <auth payload>,
 *       expires: <expiration time in seconds since the unix epoch>
 *     }
 * @param {Function=} opt_onCancel A callback function that will be called
 *     if your authentication is ever canceled
 *     (e.g. due to an expired token). The callback
 *     will be passed an Error object representing the failure.
 */
Firebase.prototype.auth =
    function(authToken, opt_onComplete, opt_onCancel) {};


/**
 * Get a Firebase reference for the location at the specified relative path.
 * The relative path can either be a simple child name (e.g. 'fred')
 * or a deeper slash-separated path (e.g. 'fred/name/first'). 
 * @param {string} childPath a relative path from this location to
 *     the desired child location.
 * @return {Firebase} the Firebase reference for the specified child location.
 */
Firebase.prototype.child = function(childPath) {};


/**
 * Write data to this Firebase location. This will overwrite any data
 * at this location and all child locations.
 * @param {Object|Array|string|number|boolean|null} value The value
 *     to be written to your Firebase.
 * @param {Function=} opt_onComplete A callback function that will
 *     be called when synchronization to the Firebase servers has completed.
 *     The callback will be passed an Error object on failure,
 *     else null for success.
 */
Firebase.prototype.set = function(value, opt_onComplete) {};


/**
 * Write the enumerated children to this Firebase location.
 * This will overwrite only children enumerated in the 'value' parameter
 * and will leave others untouched.
 * @param {Object|Array|string|number|boolean|null} value The value
 *     to be written to your Firebase.
 * @param {Function=} opt_onComplete A callback function that will
 *     be called when synchronization to the Firebase servers has completed.
 *     The callback will be passed an Error object on failure,
 *     else null for success.
 */
Firebase.prototype.update = function(value, opt_onComplete) {};


/** Remove the data at this Firebase location. Any data at child locations
 * will also be deleted. 
 * @param {Function=} opt_onComplete A callback function that will
 *     be called when synchronization to the Firebase servers has completed.
 *     The callback will be passed an Error object on failure,
 *     else null for success.
 */
Firebase.prototype.remove = function(opt_onComplete) {};


/** Push generates a new child location using a unique name
 *  and returns a Firebase reference to it. This is useful when
 *  the children of a Firebase location represent a list of items.
 * @param {Object|Array|string|number|boolean|null} value The value
 *     to be written to your Firebase.
 * @param {Function=} opt_onComplete A callback function that will
 *     be called when synchronization to the Firebase servers has completed.
 *     The callback will be passed an Error object on failure,
 *     else null for success.
 * @return {Firebase} A Firebase reference for the generated location.
 */
Firebase.prototype.push = function(value, opt_onComplete) {};


/**
 * on() is used to listen for data changes at a particular location.
 * This is the primary way to read data from Firebase.
 * Your callback will be triggered for the initial data and
 * again whenever the data changes. Use off() to stop receiving updates.
 * @param {string} eventType One of the following strings: 'value',
 *     'child_added', 'child_changed', 'child_removed' or 'child_moved'.
 * @param {Function} callback A callback that fires when the specified
 *     event occurs. The callback will be passed a DataSnapshot.
 *     For ordering purposes, child_added, child_changed, and child_moved
 *     will also be passed a string containing the name of the previous child,
 *     by priority order (or null if it is the first child).
 * @param {Function=} opt_cancelCallback An optional callback that will be
 *     notified if your event subscription is ever canceled because
 *     your client does not have permission to read this data
 *     (or it had permission but has now lost it).
 * @param {Object=} opt_context If provided, this object will be used as this
 *     when calling your callback.
 * @return {Function} The provided callback function is returned unmodified.
 *     This is just for convenience if you want to pass an inline function to
 *     on() but store the callback function for later passing to off().
 */
Firebase.prototype.on =
    function(eventType, callback, opt_cancelCallback, opt_context) {};


/**
 * Detach a callback previously attached with on(). Note that if on()
 * was called multiple times with the same eventType and callback,
 * the callback will be called multiple times for each event, and off()
 * must be called multiple times to remove the callback.
 * @param {string=} opt_eventType One of the following strings: 'value',
 *     'child_added', 'child_changed', 'child_removed' or 'child_moved.'
 * @param {Function=} opt_callback The callback function that
 *     was passed to on().
 * @param {Object=} opt_context The context that was passed to on().
 */
Firebase.prototype.off =
    function(opt_eventType, opt_callback, opt_context) {};


/**
 * A DataSnapshot contains data from a Firebase location.
 * Any time you read Firebase data, you receive the data as a DataSnapshot.
 * @constructor
 */
function DataSnapshot() {};


/**
 * Get the Javascript object representation of the DataSnapshot.
 * @return {string|number|boolean|Array|Object|null} The snapshot's contents
 *     as a Javascript object.
 */
DataSnapshot.prototype.val = function() {};
