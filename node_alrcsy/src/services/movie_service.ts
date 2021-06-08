import * as express from 'express';
import { Movie,MovieEntity } from '../schemas/movie';
import { IMovie, IMovieId, IMovieList, IMovieIdList, IMovieWithId } from '../interfaces/movie';
import { generateId } from '../generationId/generateId';
const router = express.Router();

//Get All Movies
router.get('/', (req, res) => {
	Movie.find({}, function(err, movies) {
		if (err) {
			res.status(500).json({ info: 'Error executing query.', error: err });
		};
		if(movies){
			    const movieList: IMovieList={
					movie:movies.map(m =>
					{const movieResult: IMovie={
			 			title: m.title,
                        year: m.year,
                        director: m.director,
                        actor: m.actor
			    };

			return movieResult;
		       })
	        };
			
	     res.json(movieList);
		}

	  });
		
	});

// Add Movie
router.post('/',(req, res)=>{
	const movie=<IMovieWithId>req.body;
	Movie.find({}, {id:1}, (err, movies) => {
		movie.id=generateId(movies);

		Movie.insertMany([movie],(err,result)=>{
			if (err) {
				res.sendStatus(500);
			}	
			const resId:IMovieId={id:result[0].id}
			res.json(resId);
		});	

	});
});

// //Get a movie with id
router.get('/:id',(req, res)=>{
	Movie.findOne({id:req.params.id},{ id: 0, _id: 0, __v: 0 }, (err, movie) => {

		if (err) {
			res.status(500).json({ info: 'Error executing query.', error: err });
		}
		if(movie){
			const movieResult: IMovie={
			   title: movie.title,
			   year: movie.year,
			   director: movie.director,
			   actor: movie.actor
	       };
		   res.json(movieResult);
		}
		else{
			res.status(404);
		}
	});


});


//Delete movie
router.delete('/:id',(req,res)=>{
const id=req.params.id;
  Movie.remove({id:req.params.id},err => {
	if (err) {
		res.status(404);

	}
	res.status(200).end();


   });

});


//Put update movie
router.put('/:id',(req,res)=>{
	const movie = <IMovieWithId> req.body;
	Movie.findOneAndUpdate({id:req.params.id},movie,{ upsert: true },(err,result) => {
		if (err) {
			res.status(404);
	
		}
		res.status(200).end();
	});
});

//Search   find?year={year}&orderby={field} 

router.get('/find', (req, res) => {
    const year: number = parseInt(req.query.year);
    const orderBy: string = req.query.orderby;

    if (orderBy === 'Title' || orderBy === 'Director') {
       const sort= orderBy === 'Title' ? { title: 1 } : { director: 1 };
        Movie.find({ year: year },{ id: 0, _id: 0, __v: 0 }, { sort: orderBy.toLowerCase() }, (err, movies)=> {
			if (err) {
				res.status(500).json({ info: 'Error executing query.', error: err });
		
			}
            if (movies) {
                const movieIdList: IMovieIdList = {
                    id: movies.map(m => m.id)
                };
                res.json(movieIdList);
            } else {
                res.sendStatus(400);
            }
        });
    }
});

	
	
export default router;

