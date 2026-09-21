import { ContactData, contactContent } from './contact.content';
import { contactMinimalContent } from './minimal/contact.content';
import { contactModernContent } from './modern/contact.content';
import { contactMinimalMiniContent } from './minimalmini/contact.content';

const contentMap: Record<string, ContactData> = {
  minimal: contactMinimalContent,
  modern: contactModernContent,
  minimalmini: contactMinimalMiniContent,
};

export function getContactContent(styleId: string): ContactData {
  return contentMap[styleId] || contactContent;
}

export * from './contact.content';