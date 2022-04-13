const Manager = require('../lib/Manager.js');

test('creates an Manager object', () => {
    const manager = new Manager('Alf', 334960, 'email@email.com');
  
    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(String));

});