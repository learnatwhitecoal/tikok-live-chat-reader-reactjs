export interface GiftListDto {
  action_type: number;
  app_id: number;
  business_text: string;
  can_put_in_gift_box: boolean;
  color_infos: any[];
  combo: boolean;
  deprecated10: boolean;
  deprecated11: boolean;
  deprecated12: number;
  deprecated14: string;
  deprecated2: boolean;
  deprecated3: boolean;
  deprecated4: number;
  deprecated5: any[];
  deprecated6: number;
  deprecated7: number;
  deprecated8: number;
  deprecated9: boolean;
  describe: string;
  diamond_count: number;
  duration: number;
  event_name: string;
  for_custom: boolean;
  for_linkmic: boolean;
  gift_rank_recommend_info: string;
  gift_scene: number;
  gold_effect: string;
  gray_scheme_url: string;
  guide_url: string;
  icon: Icon;
  id: number;
  image: Icon;
  is_box_gift: boolean;
  is_broadcast_gift: boolean;
  is_displayed_on_panel: boolean;
  is_effect_befview: boolean;
  is_gray: boolean;
  is_random_gift: boolean;
  item_type: number;
  lock_info: LockInfo;
  manual: string;
  name: string;
  notify: boolean;
  primary_effect_id: number;
  region: string;
  scheme_url: string;
  special_effects: SpecialEffects;
  tracker_params: SpecialEffects;
  trigger_words: any[];
  type: number;
}

export interface Icon {
  avg_color: string;
  height: number;
  image_type: number;
  is_animated: boolean;
  open_web_url: string;
  uri: string;
  url_list: null[];
  width: number;
}

export interface LockInfo {
  gift_level: number;
  lock: boolean;
  lock_type: number;
}

export interface SpecialEffects {}
