using Demo_WebApp.API.DataModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Demo_WebApp.API.Controllers
{
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
                        return Ok(context.Frutas.Where(f => f.nombre.ToLower()
                        .Contains(criterio)).ToList());
                    }

                    return Ok(context.Frutas.ToList());
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
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

                return Ok(fruta);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
