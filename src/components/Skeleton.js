const Skeleton = () => {
    return ( 
        <div className="skeleton">
              <div role="status" className="w-full m-5 animate-pulse">
                <h3 className="h-3 bg-base-100 rounded-full w-48 mb-4"></h3>
                <p className="h-2 bg-base-100 rounded-full w-100 mb-2.5"></p>
                <p className="h-2 bg-base-100 rounded-full w-3/4 mb-2.5"></p>
                <p className="h-2 bg-base-100 rounded-full w-1/2 mb-2.5"></p>
              </div>
              <div role="status" className="w-full m-5 animate-pulse">
                <h3 className="h-3 bg-base-100 rounded-full w-48 mb-4"></h3>
                <p className="h-2 bg-base-100 rounded-full w-100 mb-2.5"></p>
                <p className="h-2 bg-base-100 rounded-full w-3/4 mb-2.5"></p>
                <p className="h-2 bg-base-100 rounded-full w-1/2 mb-2.5"></p>
              </div>
              <div role="status" className="w-full m-5 animate-pulse">
                <h3 className="h-3 bg-base-100 rounded-full w-48 mb-4"></h3>
                <p className="h-2 bg-base-100 rounded-full w-100 mb-2.5"></p>
                <p className="h-2 bg-base-100 rounded-full w-3/4 mb-2.5"></p>
                <p className="h-2 bg-base-100 rounded-full w-1/2 mb-2.5"></p>
              </div>
            </div>
     );
}
 
export default Skeleton;