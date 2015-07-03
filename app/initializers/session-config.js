export function initialize(container, application) {

  var config = {
    baseURL: application.get('baseURL'),
    apiNamespace: application.get('apiNamespace')
  };

  application.register('config:session-config', config, {
    instantiate: false
  });

  ['route', 'controller', 'view'].forEach(function(componentType) {
    application.inject(componentType, 'session-config', 'config:session-config');
  });

};

export default {
  name: 'session-config',
  initialize: initialize
};
