// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = () => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  const authApi = apisauce.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000
  })

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: 'http://localhost:3000/api/v1',
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  const login = (email, password) =>{
    console.log("dsfds", email, password);
    return api.get('homes', { email, password })}

  const signout = (headers) =>
    authApi.delete('auth/sign_out', {}, { headers })

  const createReport = (payload, headers) =>{
    const {reportContent} = payload
    console.log('sdfhsfhsjjhs')
    return api.post('/reports',{ report_content: reportContent }, { headers })
  }
    
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    login,
    signout,
    createReport,
  }
}

// let's return back our create method as the default.
export default {
  create
}
