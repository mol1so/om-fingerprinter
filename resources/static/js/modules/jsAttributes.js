export async function getJsAttributes() {
    // Date Object Setup
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset();

    // Permissions API Setup
    let geolocation, camera, microphone, notifications;
    if (navigator.permissions) {
        geolocation = (await navigator.permissions.query({ name: "geolocation" })).state;
        camera = (await navigator.permissions.query({ name: "camera" })).state;
        microphone = (await navigator.permissions.query({ name: "microphone" })).state;
        notifications = (await navigator.permissions.query({ name: "notifications" })).state;
    }

    // Return
    if (window.location.protocol === 'https:') {
        return {
            // General Attributes
            userAgent: window.navigator.userAgent,
            languages: window.navigator.languages,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor,
            cookiesEnabled: window.navigator.cookieEnabled,
            hardwareConcurrency: window.navigator.hardwareConcurrency,
            deviceMemory: window.navigator.deviceMemory,
            // Date Object
            dateTimezoneOffset: timezoneOffset,
            // Intl Object
            intlDateTimeFormat: Intl.DateTimeFormat().resolvedOptions(),
            intlNumberFormat: Intl.NumberFormat().resolvedOptions(),
            // Permissions API
            PermGeolocation: geolocation,
            PermCamera: camera,
            PermMicrophone: microphone,
            PermNotifications: notifications
        };
    } 

    return {
        // General Attributes
        userAgent: window.navigator.userAgent,
        languages: window.navigator.languages,
        platform: window.navigator.platform,
        vendor: window.navigator.vendor,
        cookiesEnabled: window.navigator.cookieEnabled,
        hardwareConcurrency: window.navigator.hardwareConcurrency,
        deviceMemory: window.navigator.deviceMemory,
        // Date Object
        dateTimezoneOffset: timezoneOffset,
        // Intl Object
        intlDateTimeFormat: Intl.DateTimeFormat().resolvedOptions(),
        intlNumberFormat: Intl.NumberFormat().resolvedOptions(),
        // Permissions API
        PermGeolocation: "Unknown",
        PermCamera: "Unknown",
        PermMicrophone: "Unknown",
        PermNotifications: "Unknown"
    };
}