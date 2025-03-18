import { CloseButton } from "@/components/ui/close-button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogPositioner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

/// * types
import { Movies } from "../../../../types";

/// * components
import { Button } from "../../components/ui/button";

/// * hooks
import { useAppDispatch } from "@/hooks/useRedux";

/// * actions
import { MOVIES_RENT_MOVIE, MOVIES_RETURN_MOVIE } from "../../store/actions";

const MovieDetailsInfoRentButton = ({
  movieSelected,
}: {
  movieSelected: Movies.MovieDetails;
}) => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const [stateReturnModalOpen, setStateReturnModalOpen] = useState(false);
  const [stateRentModalOpen, setStateRentModalOpen] = useState(false);

  /// + ************************************************
  const handleRent = () => {
    setStateRentModalOpen(false);
    dispatch(MOVIES_RENT_MOVIE(movieSelected.id));
  };

  /// + ************************************************
  const handleReturn = () => {
    setStateReturnModalOpen(false);
    dispatch(MOVIES_RETURN_MOVIE(movieSelected.id));
  };

  /// m ************************************************
  return (
    <>
      {!movieSelected.rented && (
        <div className="flex justify-between gap-4 !py-2 items-center">
          <motion.div
            className="!text-5xl"
            animate={{
              scale: [1, 1.1, 1],
              color: ["#ff0000", "#00ff00", "#0000ff"],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            AVAILABLE
          </motion.div>

          <DialogRoot placement="center" open={stateRentModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="!bg-green-500 hover:!bg-green-600"
                onClick={() => setStateRentModalOpen(true)}
              >
                Rent for $5.99
              </Button>
            </DialogTrigger>

            <DialogPositioner>
              <DialogContent
                className="!bg-[#8103ff] !rounded-lg !shadow-lg"
                style={{
                  transform:
                    "perspective(400px) rotateY(0deg) rotateX(5deg) translateX(0px) translateY(10px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <DialogHeader>
                  <DialogTitle>RENT MOVIE</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p>
                    Are you sure you want to rent this movie? <br />
                    You have to pay $5.99 to watch it.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <Button onClick={handleRent}>RENT MOVIE</Button>
                </DialogFooter>
                <DialogCloseTrigger asChild>
                  <CloseButton
                    onClick={() => setStateRentModalOpen(false)}
                    className="!translate-z-96 !bg-red-500"
                    size="sm"
                  />
                </DialogCloseTrigger>
              </DialogContent>
            </DialogPositioner>
          </DialogRoot>
        </div>
      )}
      {movieSelected.rented && movieSelected.rentedByThisUser && (
        <div className="flex justify-between gap-4 !py-2 items-center">
          <div className="!text-2xl !text-red-600">You rented this movie</div>

          <DialogRoot placement="center" open={stateReturnModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="!bg-red-500 hover:!bg-red-600"
                onClick={() => setStateReturnModalOpen(true)}
              >
                RETURN MOVIE
              </Button>
            </DialogTrigger>

            <DialogPositioner>
              <DialogContent
                className="!bg-[#8103ff] !rounded-lg !shadow-lg"
                style={{
                  transform:
                    "perspective(400px) rotateY(0deg) rotateX(5deg) translateX(0px) translateY(10px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <DialogHeader>
                  <DialogTitle>RETURN MOVIE</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p>
                    Are you sure you want to return this movie? <br /> You will
                    not be able to watch it anymore.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <Button onClick={handleReturn}>RETURN MOVIE</Button>
                </DialogFooter>
                <DialogCloseTrigger asChild>
                  <CloseButton
                    onClick={() => setStateReturnModalOpen(false)}
                    className="!translate-z-96 !bg-red-500"
                    size="sm"
                  />
                </DialogCloseTrigger>
              </DialogContent>
            </DialogPositioner>
          </DialogRoot>
        </div>
      )}
      {movieSelected.rented && !movieSelected.rentedByThisUser && (
        <div className="flex justify-center gap-4 !py-2 items-center !bg-red-500 !rounded-lg !p-4">
          <motion.div
            className="!text-5xl"
            animate={{
              scale: [1, 1.1, 1],
              color: ["#ff0000", "#00ff00", "#0000ff"],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            OUT OF STOCK :(
          </motion.div>
        </div>
      )}
    </>
  );
};

export default MovieDetailsInfoRentButton;
