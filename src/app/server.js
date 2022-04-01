import { Server, Model, Factory, hasMany, belongsTo, trait, RestSerializer } from 'miragejs';
import faker from 'faker';

export function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,

    serializers: {
      application: RestSerializer.extend({
        alwaysIncludeLinkageData: true,
      }),
    },

    models: {
      group: Model.extend({
        locations: hasMany(),
      }),
      location: Model.extend({
        group: belongsTo(),
      }),
    },

    factories: {
      location: Factory.extend({
        name() {
          return faker.address.city();
        },
      }),
      group: Factory.extend({
        withLocations: trait({
          afterCreate(group, server) {
            server.createList('location', 3, { group });
          },
        }),
      }),
    },

    seeds(server) {
      server.createList('location', 10);
      server.create('group', 'withLocations', { name: 'West Coast' });
      server.create('group', 'withLocations', { name: 'East Coast' });
      server.create('group', 'withLocations', { name: 'South' });
      server.create('group', 'withLocations', { name: 'North' });
    },

    routes() {
      this.namespace = 'api';
      this.get('/locations');
      this.get('/locations/:id');
      this.get('/groups');
      this.get('/groups/:id');
    },
  });
}
