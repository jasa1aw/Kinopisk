const passport = require('passport');
const User = require('../auth/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//id 1095339372016-moa1vt3s1kg790l1de1294vk545jpdqf.apps.googleusercontent.com
//secret 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
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user => {
            // console.log(user);
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(err){
                        return done(err)
                    }
                    if(result) {return done(null, user)};
                });
            }else{
                return done('User in not found')
            }
            
            }).catch(e => {
                return done(e)
            })
        }
    ))

    passport.use(new GoogleStrategy({
        clientID: '1095339372016-moa1vt3s1kg790l1de1294vk545jpdqf.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8000/api/auth/google",
        scope: ['openid', 'email', 'profile']
    },
    async function(accessToken, refreshToken, profile, cb) {
        const user = await User.findOne({googleId: profile.id })
        try {
            if(user){
                return cb(null, user);
            }else{
                const newUser = new User({
                    googleId: profile.id,
                    full_name: profile.displayName,
                    email: profile.emails[0].value,
                })
                await newUser.save()
                return cb(null, newUser);
            }
        } catch (err) {
            console.log(err);
        }
    }
    ));

passport.serializeUser(function(user, done){
    // console.log(user);
    done(null, user.id)
});

passport.deserializeUser(function(id, done){
    // console.log(id);
    User.findById(id).then(user => {
        done(null, user)
    }).catch(e => {
        return done(e)
    })
})