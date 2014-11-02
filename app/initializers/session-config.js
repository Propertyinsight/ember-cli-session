export function initialize(container, application) {

    var config = {
        api_namespace: application.get('api_namespace')
    };

    application.register('config:session-config', config, {instantiate: false});
    application.inject('route', 'session-config', 'config:session-config');

};

export default {
  name: 'session-config',
  initialize: initialize
};
