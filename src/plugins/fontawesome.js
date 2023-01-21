import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
library.add(far);

export default {
  fontIcon: "fa-icon",
  FontAwesomeIcon: FontAwesomeIcon,
};

// How To Use Fontawesome
//  <fa-icon :icon="['fas', 'chart-simple']" class="fa-xl" />
