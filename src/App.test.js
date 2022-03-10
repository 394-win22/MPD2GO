import { render, screen } from '@testing-library/react';
import { useData, useUserState, use } from 'utilities/firebase';
import App from './App';
import Feed from './components/Feed'

jest.mock('utilities/firebase')

const mockUser = {
  "ExampleAaronGriffin" : {
  "bio" : "Hi, I am Aaron Griffin",
  "displayName" : "Aaron Griffin",
  "email" : "AaronGriffin@example.com ",
  "expertise" : [ "Marketing", "Industrial Design" ],
  "photoURL" : "https://firebasestorage.googleapis.com/v0/b/hive-mpd2.appspot.com/o/demo_ico%2FPicture1.png?alt=media&token=4fad7137-49a8-4757-87a2-48b5a9f17a86",
  "teamId" : "ExampleBlueTeam",
  "year" : 2020
  }
}

// it('asks for data once with a user path', () => {
//   useData.mockReturnValue([mockUser, false, null]);
//   useUserState.mockReturnValue([null]);
//   render(<App/>);
//   expect(useData).toHaveBeenCalledTimes(1);
//   expect(useData).toHaveBeenCalledWith('/user', expect.any(Function));
// });

// it("shows if user is logged in", () => {
//   useData.mockReturnValue([mockUser, false,null])
//   useUserState.mockReturnValue([mockUser["ExampleAaronGriffin"]]);
//   render(<Feed/>);
  
//   const comments = screen.getByText(/Comments/i);
//   expect(comments).toBeInTheDocument();
// })

describe('Check no user',  () => {
  test('User test fails with no logged in user', () => {
    render(<App/>)
    const signInButton = screen.getByTestId("signin-button");
    expect(signInButton).toBeInTheDocument();
  })
})