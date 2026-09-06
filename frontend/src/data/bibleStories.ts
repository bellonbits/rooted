import { STORY_1_CREATION } from './story1Creation'
import { STORY_2_SADNESS } from './story2Sadness'

export const BIBLE_STORIES = [
  {
    id: 'creation',
    title: 'When God Made Everything',
    subtitle: 'The 7 Days of Creation & Eden',
    scripture: 'Genesis 1:1 – 2:25',
    ageGroup: 'Ages 4 – 10',
    durationMinutes: 6,
    coverImage: '/bible_stories/story1/panel_01_title.png',
    totalPanels: 21,
    theme: 'Creation & Life',
    iconName: 'sprout',
    storyData: STORY_1_CREATION,
  },
  {
    id: 'story2',
    title: "The Start of Man's Sadness",
    subtitle: 'The Choice in the Garden & God’s Promise',
    scripture: 'Genesis 3:1 – 6:22',
    ageGroup: 'Ages 5 – 12',
    durationMinutes: 7,
    coverImage: '/bible_stories/story2/panel_01_title.png',
    totalPanels: 25,
    theme: 'Choice, Faith & Hope',
    iconName: 'shield',
    storyData: STORY_2_SADNESS,
  },
]

export function getStoryById(id: string) {
  if (id === 'story2' || id === 'sadness') {
    return STORY_2_SADNESS
  }
  return STORY_1_CREATION
}
