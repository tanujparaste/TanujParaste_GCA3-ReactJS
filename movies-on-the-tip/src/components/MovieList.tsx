import { Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import IMovieItem from "./model/IMovieItem";
import MovieCard from "./MovieCard";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MovieList(props: { loadingStatus: boolean, errorStatus: Error, movies: IMovieItem[], headerText: string, enableAdd: boolean, enableRemove: boolean, onAdd: any, onRemove: any }) {
  return (
    <div className="mt-5">
      <Container className="p-4" fluid>
        {
          props.loadingStatus && (
            <div className="d-flex flex-column align-items-center">
              <Spinner className="mb-3" animation="border" role="status" variant="primary">
              </Spinner>
              <div>Fetching data...</div>
            </div>
          )
        }
        {
          props.errorStatus && (
            <Alert variant="danger">{props.errorStatus.message}</Alert>
          )
        }
        {
          props.movies.length !== 0 ? (
            <div>
              <h3>{props.headerText}</h3>
              <Row xs={1} md={3} lg={6}>
                {
                  props.movies.map(
                    (movie, idx) => (
                      <Col key={idx} className="d-flex justify-content-center my-3">
                        <MovieCard movieItem={movie} add={props.enableAdd} remove={props.enableRemove} onAdd={props.onAdd} onRemove={props.onRemove} />
                      </Col>
                    )
                  )
                }
              </Row>
            </div>
          ) : (!props.loadingStatus && !props.errorStatus && <div style={{ textAlign: "center" }}> <h4>No data found</h4></div>)
        }
      </Container >
      <ToastContainer hideProgressBar={true} autoClose={1000} />
    </div >
  );
}

export default MovieList;