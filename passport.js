const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const Users = require('./modules/users')
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const dotenv = require('dotenv')
dotenv.config()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:8000/auth/google/callback',
            // passReqToCallback   : true
        }
        ,
        function (accessToken, refreshToken, profile, cb){
              //  console.log(profile)
                const user = Users.upsert({ 
                    googleId: profile.id ,
                    name: profile.displayName,
                    email: profile.emails[0].value
                })
                
                return cb(null, user);
            
            }
    )
)
const cookieExtractor = req => {
  let jwt
  if (req && req.cookies) {
      jwt = req.cookies['jwt']
  }
  return jwt
}

passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: "secretKey",
        passReqToCallback: true,
      },
      (req,jwt_payload,done) => {
         //console.log(jwt_payload)
          Users.findOne({where: {googleId: jwt_payload.id}}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              req.user = user
              return done(null, user);
          } else {
              return done(null, false);
              // or you could create a new account
          }
      });
      }
    )
  );

passport.serializeUser((user,done) =>{
    done(null,user)
})

passport.deserializeUser(async(id,done) =>{
 await Users.findOne({where: {googleId: id}}, (err, user) => {
    if(err){
        done(null, false, {error:err});
    } else {
        done(null, user);
    }
  });
}) 