const Intern = require('../lib/Intern.js');

test('creates an Intern object', () => {
    const intern = new Intern('Jacob', 123456, 'email@email.com');
  
    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));

});