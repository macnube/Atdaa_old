import * as actions from './actions';
import { default as SplashContainer } from './components/SplashContainer';
import * as constants from './constants';
import reducer from './reducer';
import * as selectors from './selectors'

console.log("These are actions from dashboard index.js", actions);

export default { actions, SplashContainer, constants, reducer, selectors };