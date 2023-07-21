using Demo_WebApp.API.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Demo_WebApp.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ApiFrutasController : ApiController
    {
        [HttpGet]
        [Route("api/frutas/obtener")]
        public IHttpActionResult ObtenerFrutas(string criterio = null)
        {
            try
            {
                using (MercaditoEntities context = new MercaditoEntities())
                {
                    if (String.IsNullOrEmpty(criterio) == false &&
                        context.Frutas.Any(f => f.nombre.ToLower().
                    Contains(criterio)))
                    {
                        return Content<List<Frutas>>
                        (HttpStatusCode.OK,
                        context.Frutas.Where(f => f.nombre.ToLower()
                        .Contains(criterio)).ToList(),
                        Configuration.Formatters.JsonFormatter);
                        //return Json<List<Frutas>>
                        //    (context.Frutas.Where(f => f.nombre.ToLower()
                        //.Contains(criterio)).ToList());
                        //return Ok(context.Frutas.Where(f => f.nombre.ToLower()
                        //.Contains(criterio)).ToList());
                    }

                    return Content<List<Frutas>>
                        (HttpStatusCode.OK,
                        context.Frutas.ToList(),
                        Configuration.Formatters.JsonFormatter);
                    //return Json<List<Frutas>>
                    //    (context.Frutas.ToList());
                    //return Ok(context.Frutas.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content<Exception>(HttpStatusCode.InternalServerError,
                    ex, Configuration.Formatters.JsonFormatter);
                //return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/frutas/agregar")]
        public IHttpActionResult AgregarFruta(Frutas fruta)
        {
            try
            {
                using (MercaditoEntities context =
                    new MercaditoEntities())
                {
                    context.Frutas.Add(fruta);
                    context.SaveChanges();
                }

                return Content<Frutas>(HttpStatusCode.Created,
                    fruta, Configuration.Formatters.JsonFormatter);
                //return Ok(fruta);
            }
            catch (Exception ex)
            {
                return Content<Exception>(HttpStatusCode.InternalServerError,
                    ex, Configuration.Formatters.JsonFormatter);
                //return InternalServerError(ex);
            }
        }
    }
}
