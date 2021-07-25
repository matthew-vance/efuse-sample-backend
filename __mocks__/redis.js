module.exports = {
  createClient: jest.fn().mockReturnValue({
    on: jest.fn(() => {}),
    get: jest.fn((key, cb) => cb(null)),
    set: jest.fn((key, value, cb) => cb()),
    del: jest.fn(),
  }),
};
