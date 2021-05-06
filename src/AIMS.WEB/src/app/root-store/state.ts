import { rootFeatureKey } from './selectors';
import { State } from './reducer';
import { ReportState } from './report-store/reducer';
import { reportFeatureKey } from './report-store/selectors';
import { CategoryState } from './category-store/reducer';
import { categoryFeatureKey } from './category-store/selectors';
import { AuthorState } from './author-store/reducer';
import { AssetState } from './asset-store/reducer';
import { assetFeatureKey } from './asset-store/selectors';
import { authorFeatureKey } from './author-store/selectors';
import { userFeatureKey } from './user-store/selectors';
import { UserState } from './user-store/reducer';
import { circulationFeatureKey } from './circulation-store/selectors';
import { CirculationState } from './circulation-store/reducer';

export interface RootState {
  [rootFeatureKey]: State;
  [assetFeatureKey]: AssetState;
  [authorFeatureKey]: AuthorState;
  [categoryFeatureKey]: CategoryState;
  [userFeatureKey]: UserState;
  [circulationFeatureKey]: CirculationState;
  [reportFeatureKey]: ReportState;
}
