// 渲染评论内容
class Comment extends React.Component {
  render() {
    return (
      <div>
        <div className="comment-body">
          {this.props.children}
        </div>
        <div className="comment-author">
          {this.props.author}
        </div>
      </div>
    )
  }
}

// 表单组件
class CommentForm extends React.Component {

  // 表单提交事件
  handleSubmit(e) {
    e.preventDefault();
    const author = ReactDOM.findDOMNode(this.refs.author).value;
    const body = ReactDOM.findDOMNode(this.refs.author).value;
    const form = ReactDOM.findDOMNode(this.refs.form);

    this.props.onSubmit({ author: author, body: body });

    form.reset();
  }

  render() {
    return (
      <form className="comment-form" ref="form" onSubmit={e => { this.handleSubmit(e) }}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Input your comment" ref="body" />
        <input type="submit" value="Add Comment" />
      </form>
    );
  }
}

// 评论列表组件
class CommentList extends React.Component {
  render() {
    // 使用迭代的时候需要添加 key 属性
    var commentNode = this.props.comments.map(function (comment, index) {
      return (
        <Comment key={"comment-" + index} author={comment.author}>
          {comment.body}
        </Comment>
      )
    })
    return (
      <div className="comment-list">
        {commentNode}
      </div>
    )
  }
}

// 整体容器，box
class CommentBox extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comments: props.comments || []
    }
  }

  // 加载服务器端数据
  loadDataFromServer() {
    $.ajax(this.props.url).done(comments => {
      this.setState({ comments: comments });
    })
  }

  // 页面加载完成后渲染数据
  componentDidMount() {
    this.loadDataFromServer();
  }

  // 发表评论
  handleNewComment(comment) {
    const comments = this.state.comments;
    const newComments = comments.concat([comment])
    this.setState({ comments: newComments })

    $.post(this.props.url, comment).then(comments => {
      this.setState({ comments: comments });
    })
  }

  // 渲染
  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList comments={this.state.comments} />
        <CommentForm onSubmit={comment => this.handleNewComment(comment)} />
      </div>
    )
  }
}

ReactDOM.render(
  <CommentBox url="comments.json" />,
  document.getElementById("box")
)
