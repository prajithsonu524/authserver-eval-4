const HttpError = require('../../../../src/utils/errors/httpError')
const { validate } = require('../../../../src/middlewares/validator')

describe('Tests for validator', () => {
  const req = {
    body: {
      username: 'saatwik',
      password: 123456
    }
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }
  it('should call the next function when data is validated', () => {
    const next = jest.fn()
    const schema = { validate: jest.fn().mockReturnValue({ error: null }) }

    validate(schema)(req, res, next)
    expect(next).toHaveBeenCalled()
  })
  it('should throw an error when the data is not validated', () => {
    const next = jest.fn()
    const schema = { validate: jest.fn().mockReturnValue({ error: new Error() }) }

    validate(schema)(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalled()
  })
})
