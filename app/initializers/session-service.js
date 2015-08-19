export function initialize(container, application) {
  ['route', 'controller', 'view'].forEach(function(componentType) {
    application.inject(componentType, 'session', 'service:session');
  });
}

export default {
  name: 'session',
  initialize: initialize
};
