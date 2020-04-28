const  app  = require('../app');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../database/models/user');
const { findUserPerEmail, findUserPerId,findUserPerGoogleId } = require('../queries/users.querie');

app.use(passport.initialize()); // initialisation obligatoire
app.use(passport.session()); // utilisation des sessions avec passport

// Après l'authentification nous ne stockons que l'_id du user
// dans la session pour ne pas la surcharger
passport.serializeUser((user, done) => {
  done(null, user._id);
})

// A chaque requête, la session est récupérée par express-session en utilisant
// l'id de la session dans le cookie. Passport récupère l'_id du user dans la session
// et exécute cette méthode. Nous récupérons le user avec son _id et le retournons
// à Passport avec done(null, user). Passport le mettra alors sur req.user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserPerId(id);
    done(null, user)
  } catch(e) {
    done(e);
  }
})

// Configuration de la stratégie locale
// Nous utilisons l'email comme identifiant et devons donc passer
// l'option usernameField
passport.use('local', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
      // Nous essayons de récupérer l'utilisateur avec son email
    const user = await findUserPerEmail(email);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        done(null, user);
      } else {
        done(null, false, { message: 'Wrong password' });
      }
    } else {
      done(null, false, { message: 'User not found'});
      

    }
  } catch(e) {
    done(e);
  }
}))


passport.use('google', new GoogleStrategy({
  clientID: '548811570269-f2c3l4ohovk28ubm0sone7or8pkvf9gs.apps.googleusercontent.com',
  clientSecret: 'NzmPmQbwkvEYOiSIptznV6v8',
  callbackURL: '/auth/google/cb'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(JSON.stringify(profile,null,2));
    const user = await findUserPerGoogleId(profile.id);
    if (user) {
      done(null, user);
    } else {
      const hashedPassword = await User.hashPassword( profile.id);
      const newUser = new User({
        username: profile.displayName,
        local: {
          googleId: profile.id,
          email: profile.emails[0].value,
          password: hashedPassword,
        },
        avatar: profile.photos[0].value
      })
      const savedUser = await newUser.save();
      done(null, savedUser);
    }
  } catch(e) {
    done(e);
  }
}));
