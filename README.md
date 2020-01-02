## Description

Project backend, because I was bored to start every project from kind of scratch, and copy modules from other projects
Then I came with idea to bring them together and publish it here as open source projects.

Projects is based on framework [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install
```

## Configure

Review `.env.schema` contains all of available environment variables, but not all are required, to check with on are
required, check it with file: `src/app/config/env.schema.ts` it's filled with [Joi](https://www.npmjs.com/package/@hapi/joi)
validation, where you will see a `.default` call with default value. I doesn't have for now better solution to figure 
out which one of env is required.

## Running the app

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  Nest is [MIT licensed](LICENSE).


## Working on

* fixtures
    * fake users
    * roles
    * access control list
    * fake blog data

* config
    * env validation
    * TypeORM config service

* core
    * kind of sharable resources

* auth (jwt)
    * login
    * register
    * verify
    * password reset
    * password remind
    * notifications
    
* admin ([AdminLTE](https://adminlte.io/))
    * login
    * management
    
* security
    * voters
    * guards
    
* user
    * business logic
    
* blog - crud example
    * posts
    * comments    
    
Next stages:
    to be continued 
    
## Notes

I will try to wrote all of the components as independent modules with [CQRS](https://docs.nestjs.com/recipes/cqrs)


## Help

PR's are welcome
