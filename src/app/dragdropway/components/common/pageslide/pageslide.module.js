import pageslide, {
  PAGE_SLIDE_DIRECTIVE
} from './pageslide.directive';


const PAGE_SLIDE_MODULE = 'pageslide.module';

export default angular
                .module(PAGE_SLIDE_MODULE, [])
                .directive(PAGE_SLIDE_DIRECTIVE, pageslide);
