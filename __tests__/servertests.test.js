'use strict';

const {app} = require('../src/app');
const supergoose = require('./src/supergoose');
const mockRequest = supergoose(app);

describe('Categoies Model', () => {
  it('returns with 200 if route is found', async () =>{
    
    return mockRequest
      .get('/api/v1/categories')
      .expect(200);

  });

  it('returns 404 if you get a missing id', () => {
    return mockRequest
      .get('/api/v1/categories/deadbeefdeadbeefdeadbeef')
      .expect(404);
  });

  it('can use the post method', ()=> {
    return mockRequest
      .post('/api/v1/categories')
      .send({name: 'haha', description: 'hehe'})
      .expect(200);
  });
  it('can get obj from categories', ()=> {
    return mockRequest
      .get('/api/v1/categories')
      .send({name: 'haha', description: 'hehe'})
      .then(response =>{
        console.log(response.body);
        expect(response.body.count).toBe(1);
      });
  });
  it('can update using put', ()=> {
    return mockRequest
      .post('/api/v1/categories')
      .send({name: 'haha', description: 'hehe'})
      .then( update =>{
        return mockRequest
          .put(`/api/v1/categories/${update.body._id}`)
          .send({name:'tehe'})
          .then(response =>{
            //console.log(response);
            expect(response.body.name).toBe('tehe');
          });
      });
  });
  it('deletes the entry using delete method', ()=> {
    return mockRequest
      .get('/api/v1/categories')
      .then(response =>{
        expect(response.body.count).toBe(2);

        let id = response.body.results[0]._id;
        return mockRequest
          .delete(`/api/v1/categories/${id}`)
          .then(response => {
            expect(response.body).toHaveProperty('_id', id);

            return mockRequest
              .get(`/api/v1/categories/${id}`)
              .expect(404);
          });
      });
  });
});


describe('products Model', () => {
  it('returns with 200 if route is found', async () =>{
    
    return mockRequest
      .get('/api/v1/products')
      .expect(200);

  });
  it('can use the post method', ()=> {
    return mockRequest
      .post('/api/v1/products')
      .send({name: 'haha', description: 'hehe'})
      .expect(200);
  });
  it('can get obj from product', ()=> {
    return mockRequest
      .get('/api/v1/products')
      .send({name: 'haha', description: 'hehe'})
      .then(response =>{
        expect(response.body.count).toBe(2);
      });
  });
  it('can update using put', ()=> {
    return mockRequest
      .post('/api/v1/products')
      .send({name: 'haha', description: 'hehe'})
      .then( update =>{
        return mockRequest
          .put(`/api/v1/products/${update.body._id}`)
          .send({name:'tehe'})
          .then(response =>{
            expect(response.body.name).toBe('tehe');
          });
      });
  });
  it('deletes the entry using delete method', ()=> {
    return mockRequest
      .get('/api/v1/products')
      .then(response =>{
        expect(response.body.count).toBe(3);
        return mockRequest
          .delete(`/api/v1/products/${response.body.results[0]._id}`)
          .then(response => {
            expect(response.body.deletedCount).toBe(1);
          });
      });
  });
});
