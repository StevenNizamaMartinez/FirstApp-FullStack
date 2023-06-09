const allowedOrigins = ['http://localhost:5173', "https://notes-app-stevennizama.netlify.app"];
export const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
