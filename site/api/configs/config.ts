import type { Config } from './config.interface';

const config: Config = {
    nest: {
        port: 9000,
    },
    cors: {
        enabled: true,
    },
    swagger: {
        enabled: true,
        title: 'Kiyomi API',
        description: 'Kiyomi on Steroids',
        version: '2',
        path: 'docs',
    },
    // graphql: {
    //     playgroundEnabled: true,
    //     debug: true,
    //     schemaDestination: './src/schema.graphql',
    //     sortSchema: true,
    // },
    security: {
        expiresIn: '2m',
        refreshIn: '7d',
        bcryptSaltOrRound: 10,
    },
};

export default (): Config => config;