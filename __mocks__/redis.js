module.exports = {
  createClient: jest.fn().mockReturnValue({
    on: jest.fn(() => {}),
    get: jest.fn((arg1, cb) => cb(null)),
    set: jest.fn((arg1, arg2, cb) => cb()),
    sadd: jest.fn((arg1, cb) => cb()),
    smembers: jest.fn((arg1, cb) => {
      cb(null);
    }),
    mget: jest.fn(),
  }),
};
