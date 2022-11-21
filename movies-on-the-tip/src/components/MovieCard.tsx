import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import IMovieItem from "./model/IMovieItem";
import { useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';

type props = {
  movieItem: IMovieItem,
  add: boolean,
  remove: boolean,
  onAdd?: any,
  onRemove?: any
}

function MovieCard({ movieItem, add, remove, onAdd, onRemove }: props) {
  const [fullscreen, setFullscreen] = useState<string | true | undefined>(true);
  const [showMovieDetail, setShowMovieDetail] = useState(false);

  function handleShow(breakpoint: any) {
    setFullscreen(breakpoint);
    setShowMovieDetail(true);
  }

  return (
    <>
      {
        <Card className="movie-card" style={{
          width: '18rem',
          textAlign: 'center'
        }} >
          < Card.Img variant="top" src={movieItem.poster ? `${process.env.REACT_APP_REST_API_BASE_URL}/img/${movieItem.poster}`
            : ""} alt="movie poster" style={{ height: "18rem" }} onClick={() => handleShow(true)} />
          <Card.Body>
            <Card.Title>{movieItem.title}</Card.Title>
            {add && (
              <>
                <p className="add-to-favourite" onClick={
                  () => {
                    onAdd(movieItem);
                  }
                }>Add to favourites <FontAwesomeIcon icon={faHeart} color="tomato" /></p>
              </>)
            }
            {
              remove && (
                <p className="remove-from-favourite" onClick={() => {
                  onRemove(movieItem);
                }}>Remove from favourites <FontAwesomeIcon icon={faXmarkCircle} />  </p>
              )
            }
          </Card.Body >
        </Card >
      }
      <Modal show={showMovieDetail} fullscreen={fullscreen} onHide={() => setShowMovieDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title ><h1>Movie Detail</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col lg={4} className=" d-flex  justify-content-end">
                <img src={`${process.env.REACT_APP_REST_API_BASE_URL}/img/${movieItem.poster}`} alt="movie poster" />
              </Col>
              <Col lg={8}>
                <Row className='mb-3'>
                  <h2>{movieItem.title} ({movieItem.year})</h2>
                </Row>
                <Row className='mb-2'>
                  <Col lg={3} >Imdb Rating</Col><Col lg={9} >{movieItem.imdbRating ? movieItem.imdbRating : "Not Available"}</Col>
                </Row>
                <Row className='mb-2'>
                  <Col lg={3}>Content Rating</Col><Col lg={9}>{movieItem.contentRating ? movieItem.contentRating : "Not Available"}</Col>
                </Row>
                <Row className='mb-2'>
                  <Col lg={3}>Average Rating</Col><Col lg={9}>{movieItem.averageRating ? movieItem.averageRating : "Not Available"}</Col>
                </Row>
                <Row className='mb-2'>
                  <Col lg={3}>Duration</Col><Col lg={9}>{movieItem.duration ? movieItem.duration : "Not Available"}</Col>
                </Row>
                <Row className='mb-2'>
                  <Col lg={3}>Genres</Col><Col lg={9}>{movieItem.genres ? movieItem.genres.join() : "Not Available"}</Col>
                </Row>
                <Row className='mb-2'>
                  <Col lg={3}>Actors</Col><Col lg={9}>{movieItem.actors ? movieItem.actors.join() : "Not Available"}</Col>
                </Row>
                <Row className='mb-2'>
                  <Col lg={3}>Release Date</Col><Col lg={9}>{movieItem.releaseDate ? movieItem.releaseDate : "Not Available"}</Col>
                </Row>
                <Row className='mb-2'>
                  <Col lg={3}>Story line</Col><Col lg={9}>{movieItem.storyline ? movieItem.storyline : "Not Available"}</Col>
                </Row>
              </Col>
            </Row>
          </Container >
        </Modal.Body >
      </Modal >
    </>
  );
}

export default MovieCard;