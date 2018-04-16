// each post will have a title and category
export interface Post {
  title: string;
  category: string;
}

// grouped posts by category
export interface GroupPosts {
  category: string;
  posts: Post[];
}
