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
    baseURL: 'http://1bc645f1.ngrok.io',
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000
  })

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: 'http://1bc645f1.ngrok.io/api/v1',
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
  const getUser = (username) => api.get('search/users', { q: username })
  const login = (payload, headers) => {
    const { phone_number, password } = payload
    console.log("Mobile No and password during login ", phone_number, password)
    const data = new FormData();
    data.append('phone_number', phone_number)
    data.append('password', password)
    console.log("data is : ", data)
    return authApi.post('auth/sign_in', data, { headers })
  }

  const signout = (headers) =>
    authApi.delete('auth/sign_out', {}, { headers })

  const createReport = (payload, headers) => {
    const { reportContent, school_id, user_id, image, audio } = payload
    console.log('Report Content is : ', payload)
    const data = new FormData();
    if (image) {
      data.append('image', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'image.jpg'
      });
    }
    if(audio){
      data.append('audio', {
        uri: audio,
        type: 'audio/aac',
        name: 'audio.aac'
      })
    }
    data.append('school_id', school_id)
    data.append('user_id', user_id)
    data.append('report_text', reportContent)
    console.log("data : ", data)
    return api.post('/reports', data, { headers })
  }

  const comments = (payload, headers) => {
    const { user_id, report_id, text } = payload
    console.log('Comments : ', payload)
    const data = new FormData();
    data.append('user_id', user_id)
    data.append('report_id', report_id)
    data.append('text', text)
    console.log("data : ", data)
    return api.post('/comments', data, { headers })
  }

  const reportReactions = (payload, headers) => {
    const { user_id, report_id, is_agree } = payload
    console.log('reportReactions : ', payload)
    const data = new FormData();
    data.append('user_id', user_id)
    data.append('report_id', report_id)
    data.append('is_agree', is_agree)
    console.log("data : ", data)
    return api.post('/report_reactions', data, { headers })
  }



  const signup = (payload, headers) => {
    const { mobile_no, username, password } = payload
    console.log('sigup content is : ', payload)
    const data = new FormData();
    data.append('phone_number', mobile_no)
    data.append('user_name', username)
    data.append('password', password)
    console.log("data : ", data)
    return authApi.post('/auth', data, { headers })
  }


  const allSchoolsData = (payload, headers) => {
    const { tehsil } = payload
    return api.get('/schools', { tehsil: tehsil }, { headers })
  }

  const allReports = (payload, headers) => {
    return api.get('/reports', {}, { headers })
  }

  const myReports = (payload, headers) => {
    const { user_id } = payload
    console.log("my reports User_id is : ", user_id)
    return api.get('/reports/user_reports', { user_id: user_id }, { headers })
  }

  const SchoolDetailData = (payload, headers) => {
    const { school_id } = payload
    const formData = new FormData();
    formData.append('school_id', school_id);
    return api.get('/school_details', { school_id: school_id }, { headers })
  }

  const uniqueSchoolsData = (payload, headers) => {
    const { district, tehsil } = payload
    const formData = new FormData();
    formData.append('district', district);
    formData.append('tehsil', tehsil);
    return api.put('/schools/sorted_data', formData, { headers })
  }

  const getDistricts = (payload, headers) => {
    return api.get('/schools/district', {}, { headers })
  }

  const getTehsils = (payload, headers) => {
    const { district } = payload
    return api.get('/schools/tehsil', { district: district }, { headers })
  }

  const verifyOtp = (payload, headers) => {
    console.log('jklfsjfsdkjdsfhkjdsfjnsdfnjcsnfjdsln jfdsnfslkjkjfsdskjkjsd', payload)
    const { phone_number, otp } = payload
    const formData = new FormData();
    formData.append('phone_number', phone_number);
    formData.append('otp_code', otp);
    return api.put('/otp_codes/1', formData, { headers })
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
    allSchoolsData,
    SchoolDetailData,
    uniqueSchoolsData,
    allReports,
    signup,
    verifyOtp,
    getDistricts,
    getTehsils,
    comments,
    reportReactions,
    myReports
  }
}

// let's return back our create method as the default.
export default {
  create
}
