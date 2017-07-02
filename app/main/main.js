import module from '../module';
import topnav from '../nav/topnav';

let main = module.directive('main', function() {
    return {
        'templateUrl': 'main/main.html',
    };
});

export default  main;
