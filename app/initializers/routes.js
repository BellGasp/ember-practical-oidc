import Router from '../router';

export function initialize(/* application */) {
  Router.map(function () {
    this.route('popup');
    this.route('renew');
  });
}

export default {
  name: 'routes',
  initialize
};
