import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemNews from '../../components/ItemNews'
import MenuInner from '../../components/MenuInner'
import { fetchPublications } from '../../redux/content/actions'
import { OverlaySpinner } from '../../components/Loaders'
import { formatDate } from '../../utils'

class MainPage extends Component {
  constructor () {
    super()
    this.state = {
      newsLoading: true
    }
  }
  componentDidMount () {
    const { content } = this.props
    if (!content.publications) this.req = this.props.fetchPublications()
  }
  render () {
    const { content, user } = this.props
    if (content.publicationsLoading) {
      return <OverlaySpinner />
    }
    return <div className='container container-fluid'>
      <MenuInner user={user} />
      <div className='item-news-wrap'>
        {
          content.publications.items && content.publications.items.map((publication) => {
            return <ItemNews
              key={publication.id}
              link={publication.link}
              image={publication.image}
              date={formatDate(publication.date_publicated, 'DD MMMM YYYY')}
              title={publication.title}
            />
          })
        }
      </div>
    </div>
  }
}

const mapStateToProps = ({ content, user }) => {
  return {
    content,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPublications () {
      return dispatch(fetchPublications())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
