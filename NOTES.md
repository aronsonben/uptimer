# Development Notes
A live document of my thoughts & plans while developing. Super informal.

## Versions

#### v0.0.1
*Initial commits, basic structure of app & inputs. Mock data*

#### v0.0.2
[ x ] Implement AsyncStorage for in-session tracking
  [ x ] Add sample data upon load
[ x ] Add new task to log *(so we know Async is working)*
[ - ] Clean up taskLog table UI
[ ] Create deployment (to GitHub Pages?)

#### Future
[ ] Setup database for task logging
[ ] Improve timer to include milliseconds


## Development Decisions & Research

### Database
I need a simple database, something that won't take long to learn & setup, won't cost money, and will be future-proof. In otherwords, I'm not sure if a JSON database would be best for longevity, but it might also be sufficient. Here are some options:

- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [Firebase](https://firebase.google.com/docs/database/web/start)
- supabase
- IndexedDB / localStorage
- JSON file
- Amazon RDS

## Dev Journal

### 12/8
If I do implement a full-on database, Amazon RDS might be a good call... BUT: I will need to convert this to a full-stack Node.js app. This is fine, but definitely expanding scope. Let's go ahead with localStorage - maybe it doesn't even persist. Let's get v0.1 out such that you can just set the timer and see your session. Maybe I can do a quick "copy as csv" kinda thing.

The thing is... is it really worth