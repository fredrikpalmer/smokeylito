import app from './server';
import request from 'supertest';
import { Server } from 'net';

describe('Server', () => {
    let server: Server;

    before(() => {
        server = app.listen(8888);
    });

    const throwIfError = (err: any, res: any) => { if (err) throw err }

    it('returns statuscode 200', () => {
        request(server)
            .get('/')
            .expect(200)
            .end(throwIfError);
    });

    after(() => {
        server.close();
    })
});

