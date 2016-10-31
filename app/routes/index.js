import Ember from 'ember';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import {validateLength} from 'ember-changeset-validations/validators';

const validations = {
  name: [
    validateLength({max: 100, min: 2}),
  ],
};

export default Ember.Route.extend({
  model() {
    const model = Ember.Object.create({name: 'valid-name'});
    const changeset = new Changeset(model, lookupValidator(validations), validations);
    const log = function() {
      console.log(`isPristine: ${changeset.get('isPristine')}, isValid: ${changeset.get('isValid')}, orig: '${model.get('name')}', new: '${changeset.get('name')}'`);
    };

    log();
    changeset.set('name', 'valid-but-different');
    log();
    changeset.set('name', 'x');
    log();
  }
});
